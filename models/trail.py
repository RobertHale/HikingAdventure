from model import Model

class Trail(Model):

	def __init__(self, name=None, id=None, difficulty=None, summary=None, stars=None, 
				starvotes=None, lat=None, lon=None, length=None, ascent=None, descent=None,
				img=None, resorts=None):
		super(Trail, self).__init__(name, id)
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

	# def addResort(self, id):
	# 	self.resorts.append(id)

	# def removeResort(self, id):
	# 	if id in self.resorts:
	# 		self.resorts.remove(id)
	# 		return True
	# 	return False

	# def jsonable(self):
	# 	return self.__dict__

	# def getResort(self):
	# 	return self.resort

	# def setResort(self, resortid):
	# 	self.resortid = resortid

	# def getphotos(self):
	# 	self.photoids

	# def setphotos(self, photoids):
	# 	self.photoids = photoids
		