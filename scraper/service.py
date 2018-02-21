from fetch import fetchJSON, fetchXML
from resort import Resort

##
#service class for the scraper.
#scrapes data on needed models
#and converts them into Python objects
##

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
	return res

