class Resort:
    def __init__(self, name, id):
        self.name    = name
        self.id      = id
        self.lifts   = "unknown"
        self.runs    = "unknown"
        self.website = "unknown"
        self.lat     = "unknown"
        self.long    = "unknown"
        self.elev    = "unknown"
        self.mapid   = "unknown"
        self.mapurl  = "unknown"

    def jsonable(self):
        return self.__dict__