from urllib.request import Request, urlopen
import os
import cv2
import base64
import json



headers={'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
   'Accept-Encoding': 'none',
   'Accept-Language': 'en-US,en;q=0.8',
   'Connection': 'keep-alive'}

def download_image(url):
	filename = url.split("/")[-1]
	req = Request(url, None ,headers)
	response = urlopen(req)
	with open("./app/static/{}".format(filename), "wb") as f:
		f.write(response.read())
		f.close()

	return filename

def gaussian_filter(name):
	content = os.listdir("./app/static/")
	print(name, content)
	if name in content:
		img = cv2.imread("./app/static/{}".format(name), 1)
		blur = cv2.GaussianBlur(img, (13, 13), 0)
		cv2.imwrite("./app/static/blur-{}".format(name), blur)

	path_to_file = os.path.join("./app/static/", "blur-{}".format(name))
	img = cv2.imread(path_to_file)
	_, img_buffer = cv2.imencode(".jpg", img)
	str_img = json.dumps(base64.b64encode(img_buffer).decode("utf-8"))

	return {"b64": str_img}

def canny_edges(name):
	content = os.listdir("./app/static/")
	print(name, content)
	if name in content:
		img = cv2.imread("./app/static/{}".format(name), 1)
		edges = cv2.Canny(img,169,200)
		cv2.imwrite("./app/static/canny-{}".format(name), edges)

	path_to_file = os.path.join("./app/static/", "canny-{}".format(name))
	img = cv2.imread(path_to_file)
	_, img_buffer = cv2.imencode(".jpg", img)
	str_img = json.dumps(base64.b64encode(img_buffer).decode("utf-8"))

	return {"b64": str_img}
	
def search_content():
	content = os.listdir("./app/static/")
	return {"name": content}

def load_from_server(name):
	path_to_file = os.path.join("./app/static/", name)
	img = cv2.imread(path_to_file)
	_, img_buffer = cv2.imencode(".jpg", img)
	str_img = json.dumps(base64.b64encode(img_buffer).decode("utf-8"))
	return {"b64": str_img}
