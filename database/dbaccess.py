import sys
sys.path.insert(0, '../scraper/')
from database import db_session
from models import Resort, Trail, Photo
from xml.etree import ElementTree
import fetch


def insertResorts(cnt):
	result = []
	try:
		tree = fetch.fetchXML("https://skimap.org/Regions/view/281.xml")
	except ValueError as e:
		return []
	resorts = tree.find('skiAreas')
	count = 0
	for child in resorts:
		if count >= cnt:
			break
		count += 1
		try:
			data = fetch.fetchJSON("https://skimap.org/SkiAreas/view/" + str(child.attrib['id']) + ".json")
			result.append(insertResort(data))
		except ValueError as e:
			pass
	db_session.commit()
	return result
	
def insertTrails(resort, cnt):
	data = None
	try:
		data = fetch.fetchJSON(
                'https://www.hikingproject.com/data/get-trails?lat=' + str(resort.lat) + '&lon=' + str(
                    resort.lon) + '&maxDistance=10&maxResults=' + str(
                    cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
	except ValueError as e:
		return None
	for t in data['trails']:
		trail = insertTrail(t, resort)
		resort.trails.append(trail)
	return resort.trails

def insertResort(data):
	res = Resort(name=data['name'], id=data['id'])
	res.lifts = data['lift_count'] if 'lift_count' in data else None
	res.runs = data['run_count'] if 'run_count' in data else None
	res.website = data['official_website'] if 'official_website' in data else None
	res.lat = data['latitude'] if 'latitude' in data else None
	res.lon = data['longitude'] if 'longitude' in data else None
	res.elev = data['top_elevation'] if 'top_elevation' in data else None
	res.mapid = data['ski_maps'][0]['id'] if len(data['ski_maps']) > 0 else None
	maptree = None
	try:
		maptree = fetch.fetchXML("https://skimap.org/SkiMaps/view/" + str(res.mapid) + ".xml")
		maprender = maptree.find('render')
		if maprender is not None:
			res.mapurl = maprender.get('url')
	except ValueError as e:
		res.mapurl = None
	except ElementTree.ParseError as e:
		res.mapurl = None
	try:
		yelpdata = fetch.fetchYelpJSON(
			'https://api.yelp.com/v3/businesses/search?&latitude=' + str(res.lat) + '&longitude=' + str(res.lon))
		res.yelprating = yelpdata['businesses'][0]['rating']
		res.reviewcount = yelpdata['businesses'][0]['review_count']
	except ValueError:
		res.reviewcount = 0
	except IndexError:
		res.reviewcount = 0
	merged_res = db_session.merge(res)
	insertTrails(resort=merged_res, cnt=10)
	return merged_res
	
def insertTrail(data, resort):
	trail = Trail(name=data['name'], id=data['id'])
	trail.difficulty = data['difficulty'] if 'difficulty' in data else "unknown"
	trail.summary = data['summary'] if 'summary' in data else "unknown"
	trail.stars = data['stars'] if 'stars' in data else "unknown"
	trail.starVotes = data['starVotes'] if 'starVotes' in data else "unknown"
	trail.lat = data['latitude'] if 'latitude' in data else "unknown"
	trail.lon = data['longitude'] if 'longitude' in data else "unknown"
	trail.length = data['length'] if 'length' in data else "unknown"
	trail.ascent = data['ascent'] if 'ascent' in data else "unknown"
	trail.descent = data['descent'] if 'descent' in data else "unknown"
	try:
		youtubedata = fetch.fetchJSON(
					'https://www.googleapis.com/youtube/v3/search?q=' + trail.name + '&part=snippet&type=video&maxResults=25&key=AIzaSyDRwflQaI1Zq5bqKVQJ2YBDHb7l7oD1L2o')
		trail.youtubeid = youtubedata['items'][0]['id']['videoId']
	except ValueError:
		trail.youtubeid = None
	merged_trail = db_session.merge(trail)
	photo = insertPhoto(merged_trail, resort, data)
	merged_trail.photos.append(photo)
	resort.photos.append(photo)
	return merged_trail

def insertPhoto(trail, resort, data):
	photo = Photo(name=trail.name + " photo", trailid=trail.id, resortid=resort.id,
						  lat=trail.lat, lon=trail.lon)
	photo.url = data['imgMedium'] if 'imgMedium' in data else "unknown"
	merged_photo = db_session.merge(photo)
	return merged_photo
	
if __name__ == "__main__":
	insertResorts(1)
	
	