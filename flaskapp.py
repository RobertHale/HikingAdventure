import sys

sys.path.insert(0, './database')
from flask import Flask, render_template, Response
from database import db_session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
import flask_restless
import requests

app = Flask(__name__)
app.config['DEBUG'] = False

engine = create_engine('mysql://HikingDev:HikingDev1@hadbinstance.cw0u5qkvowfz.us-east-1.rds.amazonaws.com/hikingdb?charset=utf8mb4')
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
s = scoped_session(Session)
Base = declarative_base()
Base.metadata.bind = engine

from models import Resort, Trail, Photo

Base.metadata.create_all()
manager = flask_restless.APIManager(app, session=s)
manager.create_api(Resort, methods=['GET'], exclude_columns=['trails', 'photos'])
manager.create_api(Trail, methods=['GET'], exclude_columns=['resorts', 'photos'])
manager.create_api(Photo, methods=['GET'], exclude_columns=['trails', 'resorts'])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print("here")
    day = ['rover', 'red']
    return render_template('./indexreact.html', day=day)


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == "__main__":
    app.run()
