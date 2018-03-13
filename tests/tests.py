import sys

sys.path.insert(0, '../scraper/')
sys.path.insert(0, '../database/')
from unittest import main, TestCase
from unittest.mock import MagicMock
from xml.etree import ElementTree
from scrapeService import getResorts
from models import Resort, Trail, Photo
import fetch
import scrapeService


def createresort(data, yelpdata, ytdata):
    resort = Resort(name=data['name'], id=data['id'])
    resort.lifts = data['lift_count']
    resort.runs = data['run_count']
    resort.website = data['official_website']
    resort.lat = data['latitude']
    resort.lon = data['longitude']
    resort.elev = data['top_elevation']
    resort.mapid = data['ski_maps'][0]['id']
    resort.yelprating = yelpdata['businesses'][0]['rating']
    resort.reviewcount = yelpdata['businesses'][0]['review_count']
    resort.youtubeid = ytdata['items'][0]['id']['videoId']
    return resort


def resortcontentequal(self, r1, r2):
    self.assertEqual(r1.name, r2.name)
    self.assertEqual(r1.id, r2.id)
    self.assertEqual(r1.lifts, r2.lifts)
    self.assertEqual(r1.runs, r2.runs)
    self.assertEqual(r1.website, r2.website)
    self.assertEqual(r1.lat, r2.lat)
    self.assertEqual(r1.lon, r2.lon)
    self.assertEqual(r1.elev, r2.elev)
    self.assertEqual(r1.mapid, r2.mapid)
    self.assertEqual(r1.yelprating, r2.yelprating)
    self.assertEqual(r1.reviewcount, r2.reviewcount)


def createtrail(t):
    trail = Trail(name=t['name'], id=t['id'])
    trail.difficulty = t['difficulty']
    trail.summary = t['summary']
    trail.stars = t['stars']
    trail.starVotes = t['starVotes']
    trail.lat = t['latitude']
    trail.lon = t['longitude']
    trail.length = t['length']
    trail.ascent = t['ascent']
    trail.descent = t['descent']
    trail.img = t['imgMedium']
    return trail


def trailcontentequal(self, t1, t2):
    self.assertEqual(t1.name, t2.name)
    self.assertEqual(t1.id, t2.id)
    self.assertEqual(t1.difficulty, t2.difficulty)
    self.assertEqual(t1.summary, t2.summary)
    self.assertEqual(t1.stars, t2.stars)
    self.assertEqual(t1.starVotes, t2.starVotes)
    self.assertEqual(t1.lat, t2.lat)
    self.assertEqual(t1.lon, t2.lon)
    self.assertEqual(t1.length, t2.length)
    self.assertEqual(t1.ascent, t2.ascent)
    self.assertEqual(t1.descent, t2.descent)


class ScrapServiceTests(TestCase):
    maxDiff = None

    def testresorts1(self):
        """
        test getResorts with valid fetch result
        """
        # setup
        etree = ElementTree.Element('region')
        skiareas = ElementTree.Element('skiAreas')
        skiarea = ElementTree.Element('skiArea', id="1")
        skiareas.append(skiarea)
        etree.append(skiareas)
        resort = Resort(name="foo", id=1)
        fetch.fetchXML = MagicMock(return_value=etree)
        scrapeService.getResort = MagicMock(return_value=resort)
        # function call
        res = getResorts(10)
        # validation
        fetch.fetchXML.assert_called_once_with("https://skimap.org/Regions/view/281.xml")
        scrapeService.getResort.assert_called_once_with("1")
        self.assertEqual(res, [resort])

    def testresorts2(self):
        """
        test getResorts with ValueError raised
        """
        # setup
        fetch.fetchXML = MagicMock(side_effect=ValueError)
        # function call
        res = getResorts(10)
        # validation
        fetch.fetchXML.assert_called_once_with("https://skimap.org/Regions/view/281.xml")
        self.assertEqual(res, [])

    def testresort1(self):
        """
        test getResort with valid fetchJSON
        """
        # setup
        data = {'name': 'resort', 'id': 1, 'lift_count': 2, 'run_count': 3,
                'official_website': 'url', 'latitude': 1, 'longitude': 1,
                'top_elevation': 1, 'ski_maps': [{'id': 1}]}
        yelpdata = {'businesses': [{'rating': 5, 'review_count': 5}]}
        ytdata = {'items': [{'id': {'videoId': 3}}]}
        resort = createresort(data, yelpdata, ytdata)
        fetch.fetchJSON = MagicMock(return_value=data)
        fetch.fetchXML = MagicMock(side_effect=ValueError)
        fetch.fetchYelpJSON = MagicMock(return_value=yelpdata)
        # function call
        res = scrapeService.getResort(1)
        # validation
        fetch.fetchJSON.assert_called_once_with("https://skimap.org/SkiAreas/view/1.json")
        fetch.fetchXML.assert_called_once_with("https://skimap.org/SkiMaps/view/1.xml")
        fetch.fetchYelpJSON.assert_called_once_with("https://api.yelp.com/v3/businesses/search?&latitude=1&longitude=1")
        resortcontentequal(self, res, resort)

    def testresort2(self):
        """
        test getResort with all fetchs raising ValueError
        """
        # setup
        resort = Resort()
        fetch.fetchJSON = MagicMock(side_effect=ValueError)
        fetch.fetchXML = MagicMock(side_effect=ValueError)
        fetch.fetchYelpJSON = MagicMock(side_effect=ValueError)
        # function call
        res = scrapeService.getResort(1)
        # validation
        fetch.fetchJSON.assert_called_once_with("https://skimap.org/SkiAreas/view/1.json")
        fetch.fetchXML.assert_not_called()
        fetch.fetchYelpJSON.assert_not_called()
        resortcontentequal(self, res, resort)

    def testtrails1(self):
        """
        test getTrails with valid fetchs
        """
        # setup
        data = {'trails': [{'name': 'name', 'id': 1, 'difficulty': 1, 'summary': 'sum', 'stars': 1,
                            'starVotes': 1, 'latitude': 1, 'longitude': 1, 'length': 1, 'ascent': 1,
                            'descent': 1, 'imgMedium': 'img'}]}
        trail = createtrail(data['trails'][0])
        resort = Resort(name='name', id=1)
        trail.resorts.append(resort)
        trails = {}
        fetch.fetchJSON = MagicMock(return_value=data)
        # function call
        res = scrapeService.getTrails(1, 1, 1, resort, trails)
        # validation
        fetch.fetchJSON.assert_called_once_with(
            'https://www.hikingproject.com/data/get-trails?lat=None&lon=None&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        trailcontentequal(self, res[1], trail)
        self.assertEqual(len(resort.trails), 1)

    def testtrails2(self):
        """
        test getTrails when ValueError raised
        """
        # setup
        fetch.fetchJSON = MagicMock(side_effect=ValueError)
        resort = Resort(name="name", id=1)
        trails = {}
        # function call
        res = scrapeService.getTrails(1, 1, 1, resort, trails)
        # validation
        fetch.fetchJSON.assert_called_once_with(
            'https://www.hikingproject.com/data/get-trails?lat=None&lon=None&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        self.assertEqual(trails, res)
        self.assertEqual(len(resort.trails), 0)

    def testphotos1(self):
        """
        test getTrailsAndPhotos with valid fetchs
        """
        # setup
        data = {'trails': [{'name': 'name', 'id': 1, 'difficulty': 1, 'summary': 'sum', 'stars': 1,
                            'starVotes': 1, 'latitude': 1, 'longitude': 1, 'length': 1, 'ascent': 1,
                            'descent': 1, 'imgMedium': 'img'}]}
        trail = createtrail(data['trails'][0])
        resort = Resort(name="name", id=1)
        trail.resorts.append(resort)
        photos = {}
        trails = {}
        fetch.fetchJSON = MagicMock(return_value=data)
        # function call
        res1, res2 = scrapeService.getTrailsAndPhotos(1, 1, 1, resort, trails, photos)
        # validation
        fetch.fetchJSON.assert_called_once_with(
            'https://www.hikingproject.com/data/get-trails?lat=None&lon=None&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        trailcontentequal(self, res1[1], trail)
        self.assertEqual(len(resort.trails), 1)
        self.assertEqual(photos, res2)

    def testphotos2(self):
        """
        test getTrails when ValueError raised
        """
        # setup
        fetch.fetchJSON = MagicMock(side_effect=ValueError)
        resort = Resort(name="name", id=1)
        photos = {}
        trails = {}
        # function call
        res1, res2 = scrapeService.getTrailsAndPhotos(1, 1, 1, resort, trails, photos)
        # validation
        fetch.fetchJSON.assert_called_once_with(
            'https://www.hikingproject.com/data/get-trails?lat=None&lon=None&maxDistance=10&maxResults=1&sort=distance&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        self.assertEqual(trails, res1)
        self.assertEqual(photos, res2)
        self.assertEqual(len(resort.trails), 0)


if __name__ == "__main__":  # pragma: no cover
    main()
