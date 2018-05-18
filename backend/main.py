from flask import Flask
from flask_cors import CORS

from server import server

app = Flask(__name__)
CORS(app)

S = server()
@app.route("/")
def hello():
  return "Hello World!"

@app.route("/add/<name>")
def add(name):
  return S.addUser(name)


@app.route("/getUsers")
def getUsers():
  return S.getUsers()
