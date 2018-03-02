from fetch import fetchJSON, fetchXML
from resort import Resort
from trail import Trail

"""
" service class for the scraper.
" scrapes data on needed models
" and converts them into Python objects
"""

#returns a list of all resorts scraped from skimaps.org
#only scrapes info specified in resort object
def getResorts():
	result = []
	tree = fetchXML("https://skimap.org/Regions/view/281.xml")
	resorts = tree.find('skiAreas')
	for child in resorts:
		result.append(getResort(child.attrib['id']))
	return result

#scrapes and returns a single resort
#specified by id
def getResort(id):
	data = fetchJSON("https://skimap.org/SkiAreas/view/" + str(id) + ".json")
	res = Resort(data['name'], data['id'])
	res.lifts   = data['lift_count']        if 'lift_count'       in data else -1
	res.runs    = data['run_count']         if 'run_count'        in data else -1
	res.website = data['official_website']  if 'official_website' in data else "unknown"
	res.lat     = data['latitude']          if 'latitude'         in data else -1
	res.long    = data['longitude']         if 'longitude'        in data else -1
	res.elev    = data['top_elevation']     if 'top_elevation'    in data else -1
	res.mapid   = data['ski_maps'][0]['id'] if len(data['ski_maps']) > 0  else -1
	maptree = None
	try:
		maptree = fetchXML("https://skimap.org/SkiMaps/view/" + str(res.mapid) + ".xml")
		maprender = maptree.find('render')
		res.mapurl  = maprender.get('url')
	except ValueError as e:
		res.mapurl = "unknown"
	return res

"""
gets all trails nearby given lat and long
associates all created trails with resortid
"""
def getTrails(lon, lat, cnt, resortid):
	res = []
	data = fetchJSON('https://www.hikingproject.com/data/get-trails?lat=' + str(lat) + '&lon=' + str(lon) + '&maxDistance=10&maxResults=' + str(cnt) + 'sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
	for t in data['trails']:
		trail = Trail(t['name'], t['id'])
		trail.difficulty = t['difficulty'] if 'difficulty' in t else "unknown"
		trail.summary    = t['summary']    if 'summary'    in t else "unknown"
		trail.stars      = t['stars']      if 'stars'      in t else 0
		trail.starVotes  = t['starVotes']  if 'starVotes'  in t else 0
		trail.lat        = t['latitude']   if 'latitude'   in t else 0
		trail.long       = t['longitude']  if 'longitude'  in t else 0
		trail.length     = t['length']     if 'length'     in t else 0
		trail.ascent     = t['ascent']     if 'ascent'     in t else 0
		trail.descent    = t['descent']    if 'descent'    in t else 0
		trail.condition  = t['condition']  if 'condition'  in t else "unknown"
		trail.img        = t['imgMedium']  if 'imgMedium'  in t else "unknown"
		trail.resortid   = resortid
		trail.photoids   = [0, 1, 2]
		res.append(trail)
	return res

