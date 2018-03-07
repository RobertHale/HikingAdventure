import sys
sys.path.insert(0, '../database/')
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Photo(Base):
    __tablename__ = 'photos'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    resortid = Column(Integer, ForeignKey("resorts.id"))

    def __init__(self, name=None, id=None, resortid=None, photos=None):
        self.name = name
        self.id = id
        self.resortid = resortid
        if photos is None:
            photos = []
        self.photos = photos
