import sys
sys.path.insert(0, '../models/')
import scrapeService
import json
from resort import Resort
from trail import Trail
import trail
from complexhandler import ComplexHandler
import pprint

def main():
	pp = pprint.PrettyPrinter(indent=4)
	resort = scrapeService.getResort(510)
	trails = scrapeService.getTrails(resort.long, resort.lat, 1, resort.id)
	pp.pprint(trails)


if __name__ == "__main__":
    main()
