import sys
sys.path.insert(0, '../scraper/')
from database import db_session, drop_db, init_db
from models import Resort, Trail, Photo
import scrape


def insertData(resorts,trails,photos):
	for resort in resorts:
		db_session.merge(resort)
		db_session.commit()
	#for trail in trails:
	#	db_session.merge(trails[trail])
	#for photo in photos:
	#	db_session.merge(photos[photo])

	
if __name__ == "__main__":
	drop_db()
	init_db()
	r,t,p = scrape.fullscrape(10,10)
	insertData(r,t,p)
	
	