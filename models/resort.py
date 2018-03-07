import sys
sys.path.insert(0, '../database/')
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from models import ResortTrailJunction


class Resort(Base):
    __tablename__ = 'resorts'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    lifts = Column(Integer)
    runs = Column(Integer)
    website = Column(String(50), unique=True)
    lat = Column(Float)
    lon = Column(Float)
    elev = Column(Integer)
    mapid = Column(Integer)
    mapurl = Column(String(50), unique=True)
    yelprating = Column(Float)
    reviewcount = Column(Integer)
    youtubeid = Column(String(50))
    trails = relationship('Trail', secondary='rtjunc', backref='trail_resorts')

    def __init__(self, name=None, id=None, lifts=None, runs=None, website=None, lat=None, lon=None,
                 elev=None, mapid=None, mapurl=None, yelprating=None, reviewcount=None, trails=None):
        self.name = name
        self.id = id
        self.lifts = lifts
        self.runs = runs
        self.website = website
        self.lat = lat
        self.lon = lon
        self.elev = elev
        self.mapid = mapid
        self.mapurl = mapurl
        self.yelprating = yelprating
        self.reviewcount = reviewcount
        if trails is None:
            trails = []
        self.trails = trails
