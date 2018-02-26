class Resort:
    def __init__(self, name, id):
        self.name    = name
        self.id      = id
        self.lifts   = -1
        self.runs    = -1
        self.website = "unknown"
        self.lat     = -1
        self.long    = -1
        self.elev    = -1
        self.mapid   = -1
        self.mapurl  = "unknown"

    #for debug purposes this prints out way more than it needs to
    #consider changing to just name later
    def __str__(self):
        res = ''
        res += str(self.name)    + ' ' + str(self.id) + ' ' + str(self.mapid) + '\n\t'
        res += str(self.website) + '\n\t'
        res += str(self.lat)     + ' ' + str(self.long) + '\n\t'
        res += str(self.lifts)   + ' ' + str(self.runs) + ' ' + str(self.elev) + '\n'
        return res

    def __repr__(self):
        return self.__str__()

    def jsonable(self):
        return self.__dict__