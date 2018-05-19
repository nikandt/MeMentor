from flask import Flask, request
from flask_cors import CORS
import json

from server import server

app = Flask(__name__)
CORS(app)

S = server()
@app.route("/")
def hello():
  return "Hello World!"

@app.route('/adduser', methods=['GET', 'POST'])
def add_user():
    content = request.get_json(silent=True)
    print(content)
    return S.addUser( content )

@app.route("/getusers", methods=['GET'])
def get_users():
  return S.getUsers()