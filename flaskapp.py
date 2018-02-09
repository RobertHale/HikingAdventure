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
	return "you found resort " + str(resort) + "!"

@app.route('/trails/')
def trails_page():
	return "welcome to the trails page"

@app.route('/trails/<trail>/')
def trail_page(trail):
	return "you found trail " + str(trail) + "!"

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
