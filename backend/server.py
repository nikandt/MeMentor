from pymongo import MongoClient
from bson.json_util import dumps

class server:
  def __init__(self):
    self.port = 27017
    #password
    self.client = MongoClient("mongodb+srv://jebujebu:jebujebunsalasanaananas@junctiontsinghua-rfzol.mongodb.net/test")
    self.db = self.client['test']
    self.userCollection = self.db["user_collection"]

  def addUser(self, name):
    post = {"author": name,
            "skills": [],
            "interests": []}
    print( self.userCollection.users.insert_one(post).inserted_id )
    return "jee"

  def addSkill(self, name):
    post = {"author": name,}
    return self.userCollection.skills.insert_one(post).inserted_id

  def getUsers(self):
    return dumps( self.userCollection.users.find() )