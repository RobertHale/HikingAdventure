import sys
sys.path.insert(0, '../scraper/')
from database import db_session, drop_db, init_db
from models import Resort, Trail, Photo
from sqlalchemy import exc
import scrape

class DBAccess:


	
	def __init__(self, session):
		self.session = session
	
	def commit(self):
		try:
			self.session.commit()
		except exc.IntegrityError:
			self.session.rollback()
		
	def insertData(self, resorts):
		for resort in resorts:
			self.session.merge(resort)
			self.commit()
		
	def queryResort(self, id):
		return self.session.query(Resort).filter(Resort.id == id).first()

	def queryTrail(self, id):
		return self.session.query(Trail).filter(Trail.id == id).first()
		
	def queryPhoto(self, name):
		return self.session.query(Photo).filter(Photo.name == name).first()

	# Returns a list of all resorts, up to the given limit, giving no limit or a limit of 0 returns all resorts.
	def queryAllResorts(self, limit=0):
		if limit <= 0:
			return self.session.query(Resort).all()
		return 	self.session.query(Resort).limit(limit).all()
		
	def queryAllTrails(self, limit=0):
		if limit <= 0:
			return self.session.query(Trail).all()
		return 	self.session.query(Trail).limit(limit).all()
		
	def queryAllPhotos(self, limit=0):
		if limit <= 0:
			return self.session.query(Photo).all()
		return 	self.session.query(Photo).limit(limit).all()

	def queryTrailsFromResort(self, resort):
		return resort.trails

	def queryPhotosFromResort(self, resort):
		return resort.photos
		
	def queryPhotosFromTrails(self, trail):
		return trail.photos
	
	def queryResortsFromTrails(self, trail):
		return trail.resorts
		
	def queryTrailFromPhoto(self, photo):
		return photo.trail
		
	def queryResortsFromPhoto(self, photo):
		return photo.resorts

if __name__ == "__main__":
	drop_db()
	init_db()
	r,t,p = scrape.fullscrape(75,25)
	acc = DBAccess(db_session)
	acc.insertData(r)
	
	