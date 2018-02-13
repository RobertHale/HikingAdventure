from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
	return render_template('./index.html')

@app.route('/resorts/')
def resorts_page():
	return "welcome to the resorts page"

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
	return "welcome to the trails page"

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
	return "welcome to the photos page"

@app.route('/photos/<photo>/')
def photo_page(photo):
	return "you found photo " + str(photo) + "!"

@app.route('/about/')
def about_page():
	return "welcome to the about page"

@app.route('/carousel/')
def cmove():
	return render_template('./carousel.html')

if __name__ == "__main__":
	app.run()
