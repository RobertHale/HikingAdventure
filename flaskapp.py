import sys
sys.path.insert(0, './scraper/')
sys.path.insert(0, './models/')
from flask          import Flask, render_template, Response, request
from jinja2         import Template, Environment, FileSystemLoader
from resort         import Resort
from trail          import Trail
from complexhandler import ComplexHandler
import scrapeService
import requests
import json


app = Flask(__name__)
#""" only for use on local servers
app.config['SERVER_NAME'] = 'localhost:5000'
#"""

env = Environment(
   	loader=FileSystemLoader('./templates/')
)

@app.route('/')
def hello_world():
	return render_template('./home.html')

"""
simple test route that returns
a rendered jinja2 template
DO NOT allow into actual production
"""
@app.route('/test/')
def return_html():
	#load env. make global later
	
	#get template html page
	template = env.get_template("resort_temp.html")
	#get a filled resort object
	resort = scrapeService.getResort(510)
	#render template with resort info
	return template.render(resort= resort)

@app.route('/resorts/')
def resorts_page():
	return render_template("./mainpage_resorts.html")

@app.route('/resorts/<resort>/')
def resort_page(resort):
	if resort == '1':
		return render_template('./Steamboat.html')
	if resort == '2':
		return render_template('./Vail.html')
	if resort == '3':
		return render_template('./Breckenridge.html')
	return 'nothing found'

@app.route('/trails/')
def trails_page():
	return render_template("./mainpage_trails.html")

@app.route('/trails/<trail>/')
def trail_page(trail):
	if trail == '1':
		return render_template('./flash_of_gold.html')
	if trail == '2':
		return render_template('./strawberry_lane.html')
	if trail == '3':
		return render_template('./aspen_alley_trail.html')
	return 'nothing found'

@app.route('/photos/')
def photos_page():
	return render_template("./mainpage_photos.html")

@app.route('/photos/<photo>/')
def photo_page(photo):
	if photo == '1':
		return render_template('./flash_of_gold_pic.html')
	if photo == '2':
		return render_template('./strawberry_lane_pic.html')
	if photo == '3':
		return render_template('./aspen_alley_trail_pic.html')
	return 'nothing found'

@app.route('/resorts/', subdomain='api')
def resorts_API():
	"""
	get multiple resorts from Colorado

	Required Args:
		None
	Optional Args:
		maxcnt: max number of trails to return
	Note:
		maxcnt defaults to 10
	"""
	cnt = request.args.get('maxcnt', default = 10, type = int)
	response = app.response_class(
        response=json.dumps(scrapeService.getResorts(cnt), 
		indent=4, default=ComplexHandler),
        status=200,
        mimetype='application/json'
    )
	return response

@app.route('/resorts/<resortid>/', subdomain='api')
def resort_API(resortid):
	"""
	get a resort from Colorado based on resortid

	Required Args:
		None
	Optional Args:
		None
	Note:
		None
	"""
	response = app.response_class(
        response=json.dumps(scrapeService.getResort(int(resortid)), 
		indent=4, default=ComplexHandler),
        status=200,
        mimetype='application/json'
    )
	return response

@app.route('/trails/', subdomain='api')
def trails_API():
	"""
	get multiple trails from Colorado

	Required Args:
		None
	Optional Args:
		maxcnt: max number of trails to return
		resortid: resort to base search around
		lat & lon: latitude and longitude to base search around
	Note:
		Please supply resortid and lat/lon seperatly.
		If both are supplied search will be based around resortid.
		With no arguments search will default around the center of Colorado
	"""
	cnt      = request.args.get('maxcnt', default = 10, type = int)
	resortid = request.args.get('resortid', type = int)
	#default for lat and lon is the center of colorado
	lat      = request.args.get('lat', default = 39.5501, type = float)
	lon      = request.args.get('lon', default = -105.7821, type = float)
	if resortid != None:
		resort = scrapeService.getResort(resortid)
		trails = scrapeService.getTrails(resort.long, resort.lat, cnt, resortid)
	else:
		trails = scrapeService.getTrails(lon, lat, cnt, 0)
	response = app.response_class(
        response=json.dumps(trails, 
		indent=4, default=ComplexHandler),
        status=200,
        mimetype='application/json'
    )
	return response

@app.route('/trails/<trail>/', subdomain='api')
def trail_API(trail):
	"""
	get a trail from Colorado based on trailid

	Required Args:
		None
	Optional Args:
		None
	Note:
		None
	"""
	response = app.response_class(
        response=json.dumps(scrapeService.getTrails(-105.7821, 39.5501, 1, 0), 
		indent=4, default=ComplexHandler),
        status=200,
        mimetype='application/json'
    )
	return response

@app.route('/photos/', subdomain='api')
def photos_API():
	return 'thank you for using photos api.'

@app.route('/photos/<photo>/', subdomain='api')
def photo_API(photo):
	return 'thank you for using photo api.'

@app.route('/about/')
def about_page():
	return render_template('./about.html')

@app.route('/githubstats/')
def githubstats():
	github_commits = "https://api.github.com/repos/RobertHale/HikingAdventure/stats/contributors"
	github_issues  = "https://api.github.com/repos/RobertHale/HikingAdventure/issues?state=all"

	# Grab Total Commits
	response_c = requests.get(github_commits)
	commit_array = response_c.json()
	person = commit_array[0]
	commits = 0
	commits_each = {};
	for person in commit_array:
		commits = commits + person['total']
		# Stores each person's commit count separately
		commits_each[person['author']['login']] = person['total']


	# Grab Total issues
	response_i = requests.get(github_issues)
	issue_array = response_i.json()
	latest_issue = issue_array[0]
	issues = latest_issue['number']


	# Return data in a string
	data = str(commits) + " " + str(issues) + " " + str(commits_each.get("victor40", 0)) + " " + str(commits_each.get("duoALopez", 0)) + " " + str(commits_each.get("alexdai186", 0)) + " " + str(commits_each.get("RobertHale", 0)) + " " + str(commits_each.get("vponakala", 0)) + " " + str(commits_each.get("davepcast", 0))
	return data

if __name__ == "__main__":
	app.run()
