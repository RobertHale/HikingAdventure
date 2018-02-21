class Resort:
    def __init__(self, name, id):
        self.name    = name
        self.id      = id
        self.lifts   = ""
        self.runs    = ""
        self.website = ""
        self.lat     = ""
        self.long    = ""
        self.elev    = ""
        self.mapid   = ""

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