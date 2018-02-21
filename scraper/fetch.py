import requests
from xml.etree import ElementTree

#returns JSON form of response from URL
def fetchJSON(url):
	r = requests.get(url)
	assert(r.status_code is 200)
	return r.json()

#returns an ElementTree representation of
#XML response from URL
def fetchXML(url):
	r = requests.get(url)
	assert(r.status_code is 200)
	return ElementTree.fromstring(r.content)
