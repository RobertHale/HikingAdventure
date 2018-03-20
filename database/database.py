
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


engine = create_engine('mysql://HikingDev:HikingDev1@hadbinstance.cw0u5qkvowfz.us-east-1.rds.amazonaws.com/hikingdb?charset=utf8mb4', convert_unicode=True, pool_recycle=3600, encoding='utf-8')
#engine = create_engine('mysql://root@localhost:3306/test?charset=utf8mb4', convert_unicode=True, pool_recycle=3600, encoding='utf-8')
db_session = scoped_session(sessionmaker(autocommit=False,
										 autoflush=False,
										 bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db(engine=engine):
	# import all modules here that might define models so that
	# they will be registered properly on the metadata.	 Otherwise
	# you will have to import them first before calling init_db()
	import models
	Base.metadata.create_all(bind=engine)

# drops all tables in db, essentially getting rid of all data
def drop_db():
	import models
	Base.metadata.drop_all(bind=engine)