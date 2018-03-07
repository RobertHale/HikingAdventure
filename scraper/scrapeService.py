from fetch import fetchJSON, fetchXML, fetchYelpJSON
from resort import Resort
from trail import Trail
from photo import Photo
from xml.etree import ElementTree

"""
" service class for the scraper.
" scrapes data on needed models
" and converts them into Python objects
"""

#returns a list of all resorts scraped from skimaps.org
#only scrapes info specified in resort object
def getResorts(cnt):
	result = []
	tree = fetchXML("https://skimap.org/Regions/view/281.xml")
	resorts = tree.find('skiAreas')
	count = 0
	for child in resorts:
		if count >= cnt:
			break
		count += 1
		result.append(getResort(child.attrib['id']))
	return result

#scrapes and returns a single resort
#specified by id
def getResort(id):
	try:
		data = fetchJSON("https://skimap.org/SkiAreas/view/" + str(id) + ".json")
	except ValueError as e:
		return Resort("unknown", -1)
	res = Resort(data['name'], data['id'])
	res.lifts   = data['lift_count']        if 'lift_count'       in data else "unknown"
	res.runs    = data['run_count']         if 'run_count'        in data else "unknown"
	res.website = data['official_website']  if 'official_website' in data else "unknown"
	res.lat     = data['latitude']          if 'latitude'         in data else "unknown"
	res.lon     = data['longitude']         if 'longitude'        in data else "unknown"
	res.elev    = data['top_elevation']     if 'top_elevation'    in data else "unknown"
	res.mapid   = data['ski_maps'][0]['id'] if len(data['ski_maps']) > 0  else "unknown"
	maptree = None
	try:
		maptree = fetchXML("https://skimap.org/SkiMaps/view/" + str(res.mapid) + ".xml")
		maprender = maptree.find('render')
		if(maprender is not None):
			res.mapurl  = maprender.get('url')
	except ValueError as e:
		res.mapurl = "unknown"
	except ElementTree.ParseError as e:
		res.mapurl = "unknown"
	try:
		yelpdata = fetchYelpJSON('https://api.yelp.com/v3/businesses/search?&latitude=' + str(res.lat) + '&longitude=' + str(res.lon))
	except ValueError:
		res.reviewcount = 0
	else:
		res.setYelp(yelpdata['businesses'][0]['rating'], yelpdata['businesses'][0]['review_count'])
	return res

def getTrails(lon, lat, cnt, resort, trails):
	"""
	gets all trails nearby given lat and long
	associates all created trails with resortid
	"""
	data = None
	if resort is None:
		data = fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(lat) + '&lon=' + str(lon) + '&maxDistance=10&maxResults=' + str(cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
	else:
		data = fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(resort.lat) + '&lon=' + str(resort.lon) + '&maxDistance=10&maxResults=' + str(cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')

	for t in data['trails']:
		if t['id'] not in trails:
			trail = Trail(t['name'], t['id'])
			trail.difficulty = t['difficulty'] if 'difficulty' in t else "unknown"
			trail.summary    = t['summary']    if 'summary'    in t else "unknown"
			trail.stars      = t['stars']      if 'stars'      in t else "unknown"
			trail.starVotes  = t['starVotes']  if 'starVotes'  in t else "unknown"
			trail.lat        = t['latitude']   if 'latitude'   in t else "unknown"
			trail.long       = t['longitude']  if 'longitude'  in t else "unknown"
			trail.length     = t['length']     if 'length'     in t else "unknown"
			trail.ascent     = t['ascent']     if 'ascent'     in t else "unknown"
			trail.descent    = t['descent']    if 'descent'    in t else "unknown"
			trail.condition  = t['condition']  if 'condition'  in t else "unknown"
			trail.img        = t['imgMedium']  if 'imgMedium'  in t else "unknown"
			trails[trail.id] = trail
		trails[t['id']].addResort(resort.id)
		resort.addTrail(t['id'])
	return trails

def getTrailsAndPhotos(lon, lat, cnt, resort, trails, photo):
	"""
	gets all trails nearby given resort
	associates all created trails with resortid
	and adds photo for trail into the photos for the resort
	"""
	data = None
	if resort is None:
		data = fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(lat) + '&lon=' + str(lon) + '&maxDistance=10&maxResults=' + str(cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
	else:
		data = fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(resort.lat) + '&lon=' + str(resort.lon) + '&maxDistance=10&maxResults=' + str(cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')

	for t in data['trails']:
		if t['id'] not in trails:
			trail = Trail(t['name'], t['id'])
			trail.difficulty = t['difficulty'] if 'difficulty' in t else "unknown"
			trail.summary    = t['summary']    if 'summary'    in t else "unknown"
			trail.stars      = t['stars']      if 'stars'      in t else "unknown"
			trail.starVotes  = t['starVotes']  if 'starVotes'  in t else "unknown"
			trail.lat        = t['latitude']   if 'latitude'   in t else "unknown"
			trail.long       = t['longitude']  if 'longitude'  in t else "unknown"
			trail.length     = t['length']     if 'length'     in t else "unknown"
			trail.ascent     = t['ascent']     if 'ascent'     in t else "unknown"
			trail.descent    = t['descent']    if 'descent'    in t else "unknown"
			trail.condition  = t['condition']  if 'condition'  in t else "unknown"
			trail.img        = t['imgMedium']  if 'imgMedium'  in t else "unknown"
			trails[trail.id] = trail
		trails[t['id']].addResort(resort.id)
		resort.addTrail(t['id'])
		if 'imgMedium' in t:
			photo.addPhoto(t['imgMedium'], t['id'])
	return trails, photo

