import sys
sys.path.insert(0, '../database/')
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Photo(Base):
    __tablename__ = 'photos'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    url = Column(String(500))
    resortid = Column(Integer, ForeignKey("resorts.id"))
    trailid = Column(Integer, ForeignKey("trails.id"))
    lat = Column(Float)
    lon = Column(Float)

    def __init__(self, name=None, id=None, resortid=None, trailid=None, url=None, lat=None, lon=None):
        self.name = name
        self.id = id
        self.resortid = resortid
        self.trailid = trailid
        self.url = url
        self.lat = lat
        self.lon = lon
