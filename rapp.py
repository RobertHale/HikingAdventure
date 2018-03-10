import sys
sys.path.insert(0, './scraper/')
sys.path.insert(0, './models/')
sys.path.insert(0, './database/')
from flask          import Flask, render_template, Response
from jinja2         import Template, Environment, FileSystemLoader
from resort         import Resort
from trail          import Trail
from complexhandler import ComplexHandler
#import scrapeService
import requests
import json
#from database 		import db_session

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    day = ['rover', 'red']
    return render_template('./indexreact.html', day=day)

if __name__ == "__main__":
	app.run()
