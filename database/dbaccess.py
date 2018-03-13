import sys
sys.path.insert(0, '../scraper/')
from database import db_session, drop_db, init_db
from models import Resort, Trail, Photo
import scrape

class DBAccess:
	
	def __init__(self, session):
		self.session = session
	
	def insertData(self, resorts):
		for resort in resorts:
			self.session.merge(resort)
			self.session.commit()
		
	def QueryResort(self, id):
		return self.session.query(Resort).filter(Resort.id == id).first()

	def QueryTrail(self, id):
		return self.session.query(Trail).filter(Trail.id == id).first()
		
	def QueryPhoto(self, name):
		return self.session.query(Photo).filter(Photo.name == name).first()

	# Returns a list of all resorts, up to the given limit, giving no limit or a limit of 0 returns all resorts.
	def QueryAllResorts(self, limit=0):
		if limit <= 0:
			return self.session.query(Resort).all()
		return 	self.session.query(Resort).limit(limit).all()
		
	def QueryAllTrails(self, limit=0):
		if limit <= 0:
			return self.session.query(Trail).all()
		return 	self.session.query(Trail).limit(limit).all()
		
	def QueryAllPhotos(self, limit=0):
		if limit <= 0:
			return self.session.query(Photo).all()
		return 	self.session.query(Photo).limit(limit).all()

	def QueryTrailsFromResort(self, resort):
		return resort.trails

	def QueryPhotosFromResort(self, resort):
		return resort.photos
		
	def QueryPhotosFromTrails(self, trail):
		return trail.photos
	
	def QueryResortsFromTrails(self, trail):
		return trail.resorts
		
	def QueryTrailFromPhoto(self, photo):
		return photo.trail
		
	def QueryResortsFromPhoto(self, photo):
		return photo.resorts

if __name__ == "__main__":
	drop_db()
	init_db()
	r,t,p = scrape.fullscrape(10,10)
	acc = DBAccess(db_session)
	acc.insertData(r)
	
	