import service
import json
from complexhandler import ComplexHandler
import pprint

def main():
	pp = pprint.PrettyPrinter(indent=4)
	resort = service.getResort(510)
	pp.pprint(resort.__dict__)


if __name__ == "__main__":
    main()
