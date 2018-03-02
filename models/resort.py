class Resort:
    def __init__(self, name, id):
        self.name        = name
        self.id          = id
        self.lifts       = "unknown"
        self.runs        = "unknown"
        self.website     = "unknown"
        self.lat         = "unknown"
        self.lon         = "unknown"
        self.elev        = "unknown"
        self.mapid       = "unknown"
        self.mapurl      = "unknown"
        self.yelpRating  = "unknown"
        self.reviewcount = "unknown"
        self.trails      = []

    def addTrail(self, id):
        self.trails.append(id)

    def deletTrail(self, id):
        if id in self.trails:
            self.trails.remove(id)
            return True
        return False

    def setYelp(self, rating, reviewcount):
        self.yelpRating = rating
        self.reviewcount = reviewcount

    def jsonable(self):
        return self.__dict__