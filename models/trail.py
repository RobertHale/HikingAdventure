class Trail:

	def __init__(self, name, id):
		self.name = name
		self.id = id
		self.difficulty = "unknown"
		self.summary    = "unknown"
		self.stars      = "unknown"
		self.starVotes  = "unknown"
		self.lat        = "unknown"
		self.long       = "unknown"
		self.length     = "unknown"
		self.ascent     = "unknown"
		self.descent    = "unknown"
		self.condition  = "unknown"
		self.img        = "unknown"
		self.resortid   = "unknown"
		self.photoids   = []

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
		