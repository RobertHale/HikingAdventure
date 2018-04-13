import sys

sys.path.insert(0, '../scraper/')
sys.path.insert(0, '../database/')
from unittest import main, TestCase
#from mock import MagicMock
from models import Resort, Trail, Photo
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from dbaccess import DBAccess
from database import init_db

class TestApp(TestCase):

	@classmethod
	def setUpClass(self):
		self.engine = create_engine("sqlite:///:memory:")
		db_session = scoped_session(sessionmaker(autocommit=False,
										 autoflush=False,
										 bind=self.engine))
		self.acc = DBAccess(db_session)
		init_db(engine=self.engine)
		
	def testQueryResort(self):
		res = Resort()
		res.name = "Test Query Resort"
		res.id = 50
		self.acc.insertData([res])
		self.assertEqual(self.acc.queryResort(50).name, "Test Query Resort")
		
	def testQueryTrail(self):
		trail = Trail()
		trail.name = "Test Query Trail"
		trail.id = 50
		self.acc.insertData([trail])
		self.assertEqual(self.acc.queryTrail(50).name, "Test Query Trail")
		
	def testQueryPhoto(self):
		photo = Photo()
		photo.name = "Test Query Photo"
		photo.id = 50
		photo.trailid = 50
		self.acc.insertData([photo])
		self.assertEqual(self.acc.queryPhoto("Test Query Photo").id, 50)
		self.assertEqual(self.acc.queryPhoto("Test Query Photo").trailid, 50)
		
	def testInsertMerge1(self):
		res = Resort()
		res.name = "Test Insert Resort"
		res.id = 1
		res2 = Resort()
		res2.name = "Test Insert Resort Copy"
		res2.id = 1
		self.acc.insertData([res, res2])
		self.assertEqual(self.acc.queryResort(1).name, "Test Insert Resort Copy")
		
	def testInsertMerge2(self):
		res = Resort()
		res.name = "Test Insert Resort"
		res.id = 2
		t1 = Trail()
		t1.id = 1
		t2 = Trail()
		t2.id = 1
		res.trails.append(t1)
		res.trails.append(t2)
		self.acc.insertData([res])
		self.assertIsNone(self.acc.queryResort(2))
		
		
	def testRelationships(self):
		res = Resort()
		res.name = "Test Resort"
		res.id = 123
		trail = Trail()
		trail.name = "Test Trail"
		trail.id = 222
		photo = Photo()
		photo.name = "Test Trail photo"
		photo.id = 222
		photo.trail = trail
		trail.photos.append(photo)
		res.trails.append(trail)
		res.photos.append(photo)
		self.acc.insertData([res])
		self.assertEqual(self.acc.queryResort(123).name, "Test Resort")
		self.assertEqual(self.acc.queryResort(123).trails[0].name, "Test Trail")
		self.assertEqual(self.acc.queryResort(123).photos[0].name, "Test Trail photo")
		self.assertEqual(self.acc.queryTrail(222).photos[0].name, "Test Trail photo")
		
if __name__ == "__main__":  # pragma: no cover
	main()