import scrapeService
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
        photos = {}
        trails, photos = scrapeService.getTrailsAndPhotos(resort.lat, resort.lon, tcnt, resort, trails, photos)
    print("Done\n")
    return resorts, trails, photos


if __name__ == "__main__":
    main()
