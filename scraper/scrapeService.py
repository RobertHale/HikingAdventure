import sys
sys.path.insert(0, '../models/')
from resort import Resort
from trail import Trail
from photo import Photo
from xml.etree import ElementTree
import fetch

"""
" service class for the scraper.
" scrapes data on needed models
" and converts them into Python objects
"""


# returns a list of all resorts scraped from skimaps.org
# only scrapes info specified in resort object
def getResorts(cnt):
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
        result.append(getResort(child.attrib['id']))
    return result


# scrapes and returns a single resort
# specified by id
def getResort(id):
    try:
        data = fetch.fetchJSON("https://skimap.org/SkiAreas/view/" + str(id) + ".json")
    except ValueError as e:
        return Resort()
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
    return res


def getTrails(lon, lat, cnt, resort, trails):
    """
    gets all trails nearby given lat and long
    associates all created trails with resortid
    """
    data = None
    try:
        if resort is None:
            data = fetch.fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(lat) + '&lon=' + str(
                lon) + '&maxDistance=10&maxResults=' + str(
                cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        else:
            data = fetch.fetchJSON(
                'https://www.hikingproject.com/data/get-trails?lat=' + str(resort.lat) + '&lon=' + str(
                    resort.lon) + '&maxDistance=10&maxResults=' + str(
                    cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
    except ValueError as e:
        return trails
    for t in data['trails']:
        if t['id'] not in trails:
            trail = Trail(name=t['name'], id=t['id'])
            trail.difficulty = t['difficulty'] if 'difficulty' in t else "unknown"
            trail.summary = t['summary'] if 'summary' in t else "unknown"
            trail.stars = t['stars'] if 'stars' in t else "unknown"
            trail.starVotes = t['starVotes'] if 'starVotes' in t else "unknown"
            trail.lat = t['latitude'] if 'latitude' in t else "unknown"
            trail.lon = t['longitude'] if 'longitude' in t else "unknown"
            trail.length = t['length'] if 'length' in t else "unknown"
            trail.ascent = t['ascent'] if 'ascent' in t else "unknown"
            trail.descent = t['descent'] if 'descent' in t else "unknown"
            trail.img = t['imgMedium'] if 'imgMedium' in t else "unknown"
            trails[t['id']] = trail
        trails[t['id']].resorts.append(resort)
        resort.trails.append(trail)
    return trails


def getTrailsAndPhotos(lon, lat, cnt, resort, trails, photos):
    """
    gets all trails nearby given resort
    associates all created trails with resortid
    and adds photo for trail into the photos for the resort
    """
    data = None
    try:
        if resort is None:
            data = fetch.fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(lat) + '&lon=' + str(
                lon) + '&maxDistance=10&maxResults=' + str(
                cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        else:
            data = fetch.fetchJSON(
                'https://www.hikingproject.com/data/get-trails?lat=' + str(resort.lat) + '&lon=' + str(
                    resort.lon) + '&maxDistance=10&maxResults=' + str(
                    cnt) + '&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
    except ValueError as e:
        return trails, photos
    for t in data['trails']:
        if t['id'] not in trails:
            trail = Trail(name=t['name'], id=t['id'])
            trail.difficulty = t['difficulty'] if 'difficulty' in t else "unknown"
            trail.summary = t['summary'] if 'summary' in t else "unknown"
            trail.stars = t['stars'] if 'stars' in t else "unknown"
            trail.starVotes = t['starVotes'] if 'starVotes' in t else "unknown"
            trail.lat = t['latitude'] if 'latitude' in t else "unknown"
            trail.lon = t['longitude'] if 'longitude' in t else "unknown"
            trail.length = t['length'] if 'length' in t else "unknown"
            trail.ascent = t['ascent'] if 'ascent' in t else "unknown"
            trail.descent = t['descent'] if 'descent' in t else "unknown"
            photo = Photo(name=trail.name + " photo", id=trail.id, trailid=trail.id, resortid=resort.id,
                          lat=trail.lat, lon=trail.lon)
            photo.url = t['imgMedium'] if 'imgMedium' in t else "unknown"
            photos[photo.id] = photo
            trails[t['id']] = trail
        trails[t['id']].resorts.append(resort)
        resort.trails.append(trails[t['id']])
    return trails, photos
