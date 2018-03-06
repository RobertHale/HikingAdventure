from model import Model

class Resort(Model):
    def __init__(self, name=None, id=None, lifts=None, runs=None, website=None, lat=None, lon=None, 
                elev=None, mapid=None, mapurl=None, yelprating=None, reviewcount=None, trails=None):
        super(Resort, self).__init__(name, id)
        self.lifts       = lifts
        self.runs        = runs
        self.website     = website
        self.lat         = lat
        self.lon         = lon
        self.elev        = elev
        self.mapid       = mapid
        self.mapurl      = mapurl
        self.yelprating  = yelprating
        self.reviewcount = reviewcount
        if trails is None:
            trails = []
        self.trails      = trails

