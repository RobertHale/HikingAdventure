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
	if resort is '1':
		return render_template('./Steamboat.html')
	if resort is '2':
		return render_template('./Vail.html')
	if resort is '3':
		return render_template('./Breckenridge.html')

@app.route('/trails/')
def trails_page():
	return "welcome to the trails page"

@app.route('/trails/<trail>/')
def trail_page(trail):
	if trail is '1':
		return render_template('./flash_of_gold.html')
	if trail is '2':
		return render_template('./strawberry_lane.html')
	if trail is '3':
		return render_template('./aspen_alley_trail.html')

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
