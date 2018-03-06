from model import Model

class Photo(Model):
	def __init__(self, name=None, id=None, resortid=None, photos=None):
		super(Photo, self).__init__(name, id)
		self.resortid = resortid
		if photos is None:
			photos = []
		self.photos = photos
