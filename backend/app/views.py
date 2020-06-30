from app import app
from app.image_manager import download_image, gaussian_filter, search_content, load_from_server, canny_edges
import json
from flask import request

@app.route("/")
def index():
	return "Hello world!"

@app.route("/upload", methods=["POST"])
def upload_image():
	body = request.get_json()
	url = body["url"]
	name = download_image(url)
	return name

@app.route("/gaussian/<name>", methods=["GET"])
def filter_gaussian(name):
	image = gaussian_filter(name)
	return {"image": image}

@app.route("/list", methods=["GET"])
def list_images():
	image_list = search_content()
	return image_list

@app.route("/load/<name>", methods=["GET"])
def load_image(name):
	image = load_from_server(name)
	return image

@app.route("/canny/<name>", methods=["GET"])
def filter_canny(name):
	image = canny_edges(name)
	return image
