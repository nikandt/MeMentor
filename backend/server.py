from pymongo import MongoClient
from bson.json_util import dumps

from user import user

userModel = user()

class server:
  def __init__(self):
    self.port = 27017
    #jebujebunsalasanaananas
    self.client = MongoClient("mongodb+srv://jebujebu:jebujebunsalasanaananas@junctiontsinghua-rfzol.mongodb.net/test")
    self.db = self.client['test']
    self.userCollection = self.db["user_collection"]

  def checkUserEntry(self, entry):
    return userModel.checkDict(entry)

  def addUser(self, fields):
    if (self.checkUserEntry(fields)):
      self.userCollection.users.insert_one(fields).inserted_id
      return "jee"
    else:
      return ";:<"

  def addSkill(self, name):
    post = {"name": name,}
    return self.userCollection.skills.insert_one(post).inserted_id

  def getUsers(self):
    return dumps( self.userCollection.users.find() )