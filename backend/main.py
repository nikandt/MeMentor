from flask import Flask
from server import server

app = Flask(__name__)
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
