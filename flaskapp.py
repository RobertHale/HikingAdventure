from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
	#return "hello world"
	return render_template('./index.html')

@app.route('/carousel/')
def cmove():
	return render_template('./carousel.html')

if __name__ == "__main__":
	app.run()
