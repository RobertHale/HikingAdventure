class Photo:
	def __init__(self, pid, resortid):
		self.id = pid
		self.resortid = resortid
		self.photos = []

	def addPhoto(self, url, trailid):
		tup = (url, trailid)
		self.photos.append(tup)
