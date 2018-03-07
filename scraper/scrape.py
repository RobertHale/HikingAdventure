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
	resort = scrapeService.getResort(500)
	pp.pprint(resort.__dict__)


if __name__ == "__main__":
    main()
