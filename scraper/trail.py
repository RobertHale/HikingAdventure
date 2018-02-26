class Trail:

	def __init__(self, name, id):
		self.name = name
		self.id = id
		self.difficulty = ""
		self.summary = ""
		self.stars = 0
		self.starVotes = 0
		self.lat = 0
		self.long = 0
		self.length = 0
		self.ascent = 0
		self.descent = 0
		self.condition = ""
		self.img = ""
		self.resortid = 0
		self.photoids = []

	def jsonable(self):
		return self.__dict__

	def getResort(self):
		return self.resort

	def setResort(self, resortid):
		self.resortid = resortid

	def getphotos(self):
		self.photoids

	def setphotos(self, photoids):
		self.photoids = photoids
		