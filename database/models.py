from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class ResortTrailJunction(Base):
	__tablename__ = 'rtjunc'
	resortid = Column(Integer, ForeignKey("resorts.id"), primary_key=True)
	trailid = Column(Integer, ForeignKey("trails.id"), primary_key=True)
	
	def __init__(self, resortid=None, trailid=None):
		self.resortid	= resortid
		self.trailid	= trailid
		
	def __repr__(self):
		return '<Resort %r, Trail %r>' % (self.resortid, self.trailid)

class Resort(Base):
	__tablename__ = 'resorts'
	id		= Column(Integer, primary_key=True)
	name	= Column(String(50), unique=True)
	lifts	= Column(Integer)
	runs	= Column(Integer)
	website = Column(String(50), unique=True)
	lat		= Column(Float)
	long	= Column(Float)
	elev	= Column(Integer)
	mapid	= Column(Integer)
	mapurl	= Column(String(50), unique=True)
	reviews = Column(String(50))
	trails = relationship('Trail', secondary='rtjunc', backref='resorts')
	
	def __init__(self, name=None, lifts=None, runs=None, website=None, lat=None, long=None, elev=None, mapid=None, mapurl=None, reviews=None):
		self.name		= name
		self.lifts		= lifts
		self.runs		= runs
		self.website	= website
		self.lat		= lat
		self.long		= long
		self.elev		= elev
		self.mapid		= mapid
		self.mapurl		= mapurl
		self.review		= reviews
	
	def __repr__(self):
		return '<Resort %r>' % (self.name)

class Trail(Base):
	__tablename__ = 'trails'
	id			= Column(Integer, primary_key=True)
	name		= Column(String(50), unique=True)
	difficulty	= Column(String(50))
	summary		= Column(String(5000))
	stars		= Column(Integer)
	starVotes	= Column(Integer)
	lat			= Column(Float)
	long		= Column(Float)
	length		= Column(Float)
	ascent		= Column(Integer)
	descent		= Column(Integer)
	condition	= Column(String(50))
	img			= Column(String(50))
	photoids	= Column(Integer)
	resorts = relationship('Resort', secondary='rtjunc', backref='trails')
	
	def __init__(self, name=None, difficulty=None, summary=None, stars=None, starVotes=None, lat=None, long=None, length=None, ascent=None, descent=None, condition=None, img=None, photoids=None):
		self.name		= name
		self.difficulty = difficulty
		self.summary	= summary
		self.stars		= stars
		self.starVotes	= starVotes
		self.lat		= lat
		self.long		= long
		self.length		= length
		self.ascent		= ascent
		self.descent	= descent
		self.condition	= condition
		self.img		= img
		self.photoids	= photoids
	
	def __repr__(self):
		return '<Trail %r>' % (self.name)

class Photo(Base):
	__tablename__ = 'photos'
	id	= Column(Integer, primary_key=True)
	resortid = Column(Integer, ForeignKey("resorts.id"))
	trailid = Column(Integer, ForeignKey("trails.id"))
	url = Column(String(50), unique=True)
	
	def __init__(self, resortid=None, trailid=None, url=None):
		self.url = url
		self.resortid = resortid
		self.trailid = trailid
	
	def __repr__(self):
		return '<Photo %r>' % (self.url)