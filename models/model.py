class Model:
	def __init__(self, name, id):
		self.__name = name
		self.__id   = id

	def getname(self):
		return self.__name

	def getid(self):
		return self.__id
