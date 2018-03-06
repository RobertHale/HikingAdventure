import sys
sys.path.insert(0, '../models/')
import scrapeService
import json
from resort import Resort
from trail import Trail
from photo import Photo
import trail
from complexhandler import ComplexHandler
import pprint

def main():
	pp = pprint.PrettyPrinter(indent=4)
	resorts, trails, photos = fullscrape(100, 10)
	for photo in photos:
		pp.pprint(photo.__dict__)

def fullscrape(rcnt, tcnt):
	"""
	do a full scrape grabbing data for resorts,
	trails, and photos.  
	args:
		rcnt = number of resorts to scrape
		tcnt = number of trails to scrape per resort
	"""
	trails = {}
	photos = []
	print("Getting resorts: ", end="")
	resorts = scrapeService.getResorts(rcnt)
	print("Done\n")
	print("Getting trails and photos: ", end="")
	for resort in resorts:
		photo = Photo(name=resort.getname(), id=resort.getid(), resortid=resort.getid())
		trails, photo = scrapeService.getTrailsAndPhotos(resort.lat, resort.lon, tcnt, resort, trails, photo)
		photos.append(photo)
	print("Done\n")
	return resorts, trails, photos




if __name__ == "__main__":
    main()
