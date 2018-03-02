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
	resorts = scrapeService.getResorts(10)
	trails = {}
	photos = {}
	for resort in resorts:
		photos[resort.id] = Photo(1, resort.id)
		trails, photos[resort.id] = scrapeService.getTrailsAndPhotos(
			resort.lon, resort.lat, 10,
			resort, trails, photos[resort.id])
		break
	pp.pprint(resorts[0].__dict__)
	pp.pprint(photos[resorts[0].id].__dict__)
	for trail in trails:
		pp.pprint(trails[trail].__dict__)
		break


if __name__ == "__main__":
    main()
