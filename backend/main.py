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

@app.route('/adduser', methods=['POST'])
def add_user():
    content = request.get_json(silent=True)
    return S.addUser( content )

@app.route('/updateuser/<mongoid>', methods=['POST'])
def update_user(mongoid):
    content = request.get_json(silent=True)
    return S.updateUser( mongoid, content )

@app.route("/getusers", methods=['GET'])
def get_users():
  return S.getUsers()

@app.route('/getuser/<mongoid>', methods=['GET'])
def get_user(mongoid):
    return S.getUser( mongoid )

@app.route('/addconversation', methods=['POST'])
def add_conversation():
    content = request.get_json(silent=True)
    return S.addConversation( content )

@app.route("/getconversations", methods=['GET'])
def get_conversations():
  return S.getConversations()

@app.route("/getconversation/<mongoid>", methods=['GET'])
def get_conversation(mongoid):
  return S.getConversation( mongoid )

@app.route("/getconversation", methods=['POST'])
def get_user_conversation():
  content = request.get_json(silent=True)
  return S.getUserConversation(content)

@app.route('/addmessage/<chatid>', methods=['POST'])
def add_message(chatid):
    content = request.get_json(silent=True)
    return S.addMessage( chatid, content )


@app.route('/addmessage', methods=['POST'])
def add_user_message():
    content = request.get_json(silent=True)
    return S.addUserMessage( content )


@app.route('/keywords', methods=['GET'])
def get_keywords():
    from data.keywords import words
    return json.dumps( words )
