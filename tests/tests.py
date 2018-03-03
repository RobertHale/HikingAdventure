import sys
sys.path.insert(0, '../scraper/')
sys.path.insert(0, '../models/')
from unittest      import main, TestCase
from unittest.mock import MagicMock
from xml.etree     import ElementTree
from scrapeService import getResorts
from resort        import Resort
from trail         import Trail
from photo         import Photo
import fetch
import scrapeService

testXML1 = "<region id=\"281\" abbreviation=\"CO \" level=\"3\" type=\"Principal Subdivision\"><skiAreas><skiArea id=\"513\">Arapahoe Basin</skiArea>"

def createResort(data, yelpdata):
	resort         = Resort(data['name'], data['id'])
	resort.lifts   = data['lift_count']
	resort.runs    = data['run_count']
	resort.website = data['official_website']
	resort.lat     = data['latitude']
	resort.lon     = data['longitude']
	resort.elev    = data['top_elevation']
	resort.mapid   = data['ski_maps'][0]['id']
	resort.mapurl  = "unknown"
	resort.setYelp(yelpdata['businesses'][0]['rating'], yelpdata['businesses'][0]['review_count'])
	return resort

def createTrail(t):
	trail = Trail(t['name'], t['id'])
	trail.difficulty = t['difficulty']
	trail.summary    = t['summary']   
	trail.stars      = t['stars']     
	trail.starVotes  = t['starVotes'] 
	trail.lat        = t['latitude']  
	trail.long       = t['longitude'] 
	trail.length     = t['length']    
	trail.ascent     = t['ascent']    
	trail.descent    = t['descent']
	trail.img        = t['imgMedium']
	return trail

class scrapServiceTests (TestCase):
	def testresorts1(self):
		"""
		test getResorts with valid fetch result
		"""
		#setup
		etree = ElementTree.Element('region')
		skiareas = ElementTree.Element('skiAreas')
		skiarea = ElementTree.Element('skiArea', id="1")
		skiareas.append(skiarea)
		etree.append(skiareas)
		resort = Resort("foo", 1)
		fetch.fetchXML  = MagicMock(return_value=etree)
		scrapeService.getResort = MagicMock(return_value=resort) 
		#function call
		res = getResorts(10)
		#validation
		fetch.fetchXML.assert_called_once_with("https://skimap.org/Regions/view/281.xml")
		scrapeService.getResort.assert_called_once_with("1")
		self.assertEqual(res, [resort])

	def testresorts2(self):
		"""
		test getResorts with ValueError raised
		"""
		#setup
		fetch.fetchXML = MagicMock(side_effect=ValueError)
		#function call
		res = getResorts(10)
		#validation
		fetch.fetchXML.assert_called_once_with("https://skimap.org/Regions/view/281.xml")
		self.assertEqual(res, [])

	def testresort1(self):
		"""
		test getResort with valid fetchJSON
		"""
		#setup
		data = {'name':'resort', 'id':1, 'lift_count':2, 'run_count': 3,
				'official_website':'url', 'latitude':1, 'longitude':1,
				'top_elevation': 1, 'ski_maps':[{'id':1}]}
		yelpdata = {'businesses':[{'rating':5, 'review_count':5}]}
		resort = createResort(data, yelpdata)
		fetch.fetchJSON     = MagicMock(return_value=data)
		fetch.fetchXML      = MagicMock(side_effect=ValueError)
		fetch.fetchYelpJSON = MagicMock(return_value=yelpdata)
		#function call
		res = scrapeService.getResort(1)
		#validation
		fetch.fetchJSON.assert_called_once_with("https://skimap.org/SkiAreas/view/1.json")
		fetch.fetchXML.assert_called_once_with("https://skimap.org/SkiMaps/view/1.xml")
		fetch.fetchYelpJSON.assert_called_once_with("https://api.yelp.com/v3/businesses/search?&latitude=1&longitude=1")
		self.assertEqual(res.__dict__, resort.__dict__)

	def testresort2(self):
		"""
		test getResort with all fetchs raising ValueError
		"""
		#setup
		resort = Resort("unknown", -1)
		fetch.fetchJSON     = MagicMock(side_effect=ValueError)
		fetch.fetchXML      = MagicMock(side_effect=ValueError)
		fetch.fetchYelpJSON = MagicMock(side_effect=ValueError)
		#function call
		res = scrapeService.getResort(1)
		#validation
		fetch.fetchJSON.assert_called_once_with("https://skimap.org/SkiAreas/view/1.json")
		fetch.fetchXML.assert_not_called()
		fetch.fetchYelpJSON.assert_not_called()
		self.assertEqual(res.__dict__, resort.__dict__)

	def testtrails1(self):
		"""
		test getTrails with valid fetchs
		"""
		#setup
		data  = {'trails':[{'name':'name', 'id':1, 'difficulty':1, 'summary':'sum', 'stars':1,
				 'starVotes':1, 'latitude':1, 'longitude':1, 'length':1, 'ascent':1,
				 'descent':1, 'imgMedium':'img'}]}
		trail  = createTrail(data['trails'][0])
		trail.addResort(1)
		resort = Resort('name', 1)
		trails = {}
		fetch.fetchJSON = MagicMock(return_value=data)
		#function call
		res = scrapeService.getTrails(1, 1, 1, resort, trails)
		#validation
		fetch.fetchJSON.assert_called_once_with('https://www.hikingproject.com/data/get-trails?lat=unknown&lon=unknown&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
		self.assertEqual(res[1].__dict__, trail.__dict__)
		self.assertEqual(resort.trails, [1])
		self.assertEqual(trails[1].__dict__, trail.__dict__)

	def testtrails2(self):
		"""
		test getTrails when ValueError raised
		"""
		#setup
		fetch.fetchJSON = MagicMock(side_effect=ValueError)
		resort = Resort("name", 1)
		trails = {}
		#function call
		res = scrapeService.getTrails(1, 1, 1, resort, trails)
		#validation
		fetch.fetchJSON.assert_called_once_with('https://www.hikingproject.com/data/get-trails?lat=unknown&lon=unknown&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
		self.assertEqual(trails, res)
		self.assertEqual(len(resort.trails), 0)

	def testphotos1(self):
		"""
		test getTrailsAndPhotos with valid fetchs
		"""
		#setup
		data  = {'trails':[{'name':'name', 'id':1, 'difficulty':1, 'summary':'sum', 'stars':1,
				 'starVotes':1, 'latitude':1, 'longitude':1, 'length':1, 'ascent':1,
				 'descent':1, 'imgMedium':'img'}]}
		trail  = createTrail(data['trails'][0])
		trail.addResort(1)
		resort = Resort('name', 1)
		photo  = Photo(2, 1)
		trails = {}
		fetch.fetchJSON = MagicMock(return_value=data)
		#function call
		res1, res2 = scrapeService.getTrailsAndPhotos(1, 1, 1, resort, trails, photo)
		#validation
		fetch.fetchJSON.assert_called_once_with('https://www.hikingproject.com/data/get-trails?lat=unknown&lon=unknown&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
		self.assertEqual(res1[1].__dict__, trail.__dict__)
		self.assertEqual(resort.trails, [1])
		self.assertEqual(trails[1].__dict__, trail.__dict__)
		self.assertEqual(photo.photos, res2.photos)

	def testphotos2(self):
		"""
		test getTrails when ValueError raised
		"""
		#setup
		fetch.fetchJSON = MagicMock(side_effect=ValueError)
		resort = Resort("name", 1)
		photo  = Photo(2, 1)
		trails = {}
		#function call
		res1, res2 = scrapeService.getTrailsAndPhotos(1, 1, 1, resort, trails, photo)
		#validation
		fetch.fetchJSON.assert_called_once_with('https://www.hikingproject.com/data/get-trails?lat=unknown&lon=unknown&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
		self.assertEqual(trails, res1)
		self.assertEqual(photo,  res2)
		self.assertEqual(len(resort.trails), 0)



if __name__ == "__main__" : # pragma: no cover
	main()