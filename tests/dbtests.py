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
		
	def testInsert(self):
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
		#res.lifts = 1
		#res.website = "Test Website"
		#res.lat = 0.0f
		#res.lon = 0.0f
		self.acc.insertData([res])
		self.assertEqual(self.acc.queryResort(123).name, "Test Resort")
		self.assertEqual(self.acc.queryResort(123).trails[0].name, "Test Trail")
		
if __name__ == "__main__":  # pragma: no cover
	main()