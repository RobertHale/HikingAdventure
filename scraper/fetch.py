import requests
from xml.etree import ElementTree

#returns JSON form of response from URL
def fetchJSON(url):
	r = requests.get(url)
	if r.status_code is not 200:
		raise ValueError
	return r.json()

#returns an ElementTree representation of
#XML response from URL
def fetchXML(url):
	r = requests.get(url)
	if r.status_code is not 200:
		raise ValueError
	return ElementTree.fromstring(r.content)
