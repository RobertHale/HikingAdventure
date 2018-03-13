from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

#Association/Junction table for resorts and trails
class ResortTrailJunction(Base):
	__tablename__ = 'resort_trail_junc'
	__table_args__ = {'extend_existing': True} 
	resortid = Column(Integer, ForeignKey("resorts.id"), primary_key=True)
	trailid = Column(Integer, ForeignKey("trails.id"), primary_key=True)
	
#	def __init__(self, resortid=None, trailid=None):
#		self.resortid	= resortid
#		self.trailid	= trailid
		
	def __repr__(self):
		return '<Resort %r, Trail %r>' % (self.resortid, self.trailid)

class ResortPhotoJunction(Base):
	__tablename__ = 'resort_photo_junc'
	__table_args__ = {'extend_existing': True} 
	resortid = Column(Integer, ForeignKey("resorts.id"), primary_key=True)
	photoid = Column(String(500), ForeignKey("photos.name"), primary_key=True)

class Resort(Base):
	__tablename__ = 'resorts'
	__table_args__ = {'extend_existing': True} 
	id		    = Column(Integer, primary_key=True, autoincrement=False)
	name	    = Column(String(50), unique=True)
	lifts	    = Column(Integer)
	runs	    = Column(Integer)
	website     = Column(String(50))
	lat		    = Column(Float)
	lon 	    = Column(Float)
	elev	    = Column(Integer)
	mapid	    = Column(Integer)
	mapurl	    = Column(String(500), unique=True)
	yelprating  = Column(Float)
	reviewcount = Column(Integer)
	youtubeid   = Column(String(50))
	
	trails = relationship('Trail', secondary='resort_trail_junc', back_populates='resorts')
	photos = relationship('Photo', secondary='resort_photo_junc', back_populates='resorts')
	
#	def __init__(self, name=None, lifts=None, runs=None, website=None, lat=None, long=None, elev=None, mapid=None, mapurl=None, reviews=None):
#		self.name		= name
#		self.lifts		= lifts
#		self.runs		= runs
#		self.website	= website
#		self.lat		= lat
#		self.long		= long
#		self.elev		= elev
#		self.mapid		= mapid
#		self.mapurl		= mapurl
#		self.review		= reviews
	
	def __repr__(self):
		return '<Resort %r>' % (self.name)

class Trail(Base):
	__tablename__ = 'trails'
	__table_args__ = {'extend_existing': True} 
	id			= Column(Integer, primary_key=True, autoincrement=False)
	name		= Column(String(50))
	difficulty	= Column(String(50))
	summary		= Column(String(5000))
	stars		= Column(Integer)
	starVotes	= Column(Integer)
	lat			= Column(Float)
	lon 		= Column(Float)
	length		= Column(Float)
	ascent		= Column(Integer)
	descent		= Column(Integer)
	condition	= Column(String(50))
	youtubeid   = Column(String(50))
	
	resorts = relationship('Resort', secondary='resort_trail_junc', back_populates='trails')
	photos = relationship('Photo', back_populates='trail')
	
#	def __init__(self, name=None, difficulty=None, summary=None, stars=None, starVotes=None, lat=None, long=None, length=None, ascent=None, descent=None, condition=None, img=None):
#		self.name		= name
#		self.difficulty = difficulty
#		self.summary	= summary
#		self.stars		= stars
#		self.starVotes	= starVotes
#		self.lat		= lat
#		self.long		= long
#		self.length		= length
#		self.ascent		= ascent
#		self.descent	= descent
#		self.condition	= condition
#		self.img		= img
	
	def __repr__(self):
		return '<Trail %r>' % (self.name)

class Photo(Base):
	__tablename__ = 'photos'
	__table_args__ = {'extend_existing': True} 
	#id	= Column(Integer, primary_key=True)
	trailid = Column(Integer, ForeignKey("trails.id"))
	url = Column(String(500))
	name = Column(String(500), primary_key=True)
	lat			= Column(Float)
	lon 		= Column(Float)
	
	trail = relationship('Trail', back_populates='photos', uselist=False)
	resorts = relationship('Resort', secondary='resort_photo_junc', back_populates='photos')
	
#	def __init__(self, resortid=None, trailid=None, url=None):
#		self.url = url
#		self.resortid = resortid
#		self.trailid = trailid
	
	def __repr__(self):
		return '<Photo %r>' % (self.url)