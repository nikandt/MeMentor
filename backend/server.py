from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

from user import user

userModel = user()

class server:
  def __init__(self):
    self.users = {}
    self.port = 27017
    #jebujebunsalasanaananas
    self.client = MongoClient("mongodb+srv://jebujebu:jebujebunsalasanaananas@junctiontsinghua-rfzol.mongodb.net/test")
    self.db = self.client['test']
    self.userCollection = self.db["user_collection"]

  def addUser(self, fields):
    newuser = user()
    if (newuser.checkDict(fields)):
      newuser.setid( self.userCollection.users.insert_one(fields).inserted_id )
      self.users[newuser.id] = newuser
      return "jee"
    else:
      return ";:<"

  def updateUser(self, mongoid, new):
    if (userModel.checkField(new)):
      old = self.userCollection.users.find_one({ "_id": ObjectId(mongoid) })
      fields = {**old, **new}
      self.userCollection.users.update({ "_id": ObjectId(mongoid) },fields)
      return "jee"
    else:
      return ";:<"

  def getUsers(self):
    return dumps( self.userCollection.users.find() )

  def addConversation(self, fields):
    newuser = user()
    if (newuser.checkDict(fields)):
      newuser.setid( self.userCollection.users.insert_one(fields).inserted_id )
      self.users[newuser.id] = newuser
      return "jee"
    else:
      return ";:<"

  def updateConversation(self, mongoid, new):
    if (userModel.checkField(new)):
      old = self.userCollection.users.find_one({ "_id": ObjectId(mongoid) })
      fields = {**old, **new}
      self.userCollection.users.update({ "_id": ObjectId(mongoid) },fields)
      return "jee"
    else:
      return ";:<"

  def getConversation(self):
    return dumps( self.userCollection.users.find() )



  def addSkill(self, name):
    post = {"name": name,}
    return self.userCollection.skills.insert_one(post).inserted_id
