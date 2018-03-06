import sys
sys.path.insert(0, '../database/')
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from models import ResortTrailJunction

class Trail(Base):

	__tablename__ = 'trails'
	id            = Column(Integer, primary_key=True)
	name          = Column(String(50), unique=True)
	difficulty    = Column(String(50))
	summary       = Column(String(5000))
	stars         = Column(Float)
	starVotes     = Column(Integer)
	lat           = Column(Float)
	lon           = Column(Float)
	length        = Column(Float)
	ascent        = Column(Integer)
	descent       = Column(Integer)
	img           = Column(String(50))
	resorts       = relationship('Resort', secondary='rtjunc', backref='resort_trails')

	def __init__(self, name=None, id=None, difficulty=None, summary=None, stars=None, 
				starvotes=None, lat=None, lon=None, length=None, ascent=None, descent=None,
				img=None, resorts=None):
		self.name       = name
		self.id         = id
		self.difficulty = difficulty
		self.summary    = summary
		self.stars      = stars
		self.starvotes  = starvotes
		self.lat        = lat
		self.lon        = lon
		self.length     = length
		self.ascent     = ascent
		self.descent    = descent
		self.img        = img
		if resorts is None:
			resorts=[]
		self.resorts    = resorts
		