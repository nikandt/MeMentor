from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

from user import user
from conversation import conversation, message

userModel = user()

class server:
  def __init__(self):
    self.users = {}
    self.conversations = {}
    self.messages = {}
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

  def getUser(self, mongoid):
    return dumps(self.userCollection.users.find_one({"_id": ObjectId(mongoid)}))

  def addConversation(self, fields):
    newconversation = conversation()
    if (newconversation.checkDict(fields)):
      newconversation.setid( self.userCollection.conversations.insert_one(fields).inserted_id )
      self.conversations[newconversation.id] = newconversation
      return "jee"
    else:
      return ";:<"

  def getConversations(self):
    return dumps( self.userCollection.conversations.find() )

  def getConversation(self, mongoid):
    ret = {}
    convo = self.userCollection.conversations.find_one({"_id": ObjectId(mongoid)})
    ret["userA"] = convo["userA"]
    ret["userB"] = convo["userB"]
    ret["messages"] = []
    for m in convo["messages"]:
      ret["messages"].append(self.getMessage(m))
    return dumps(ret)

  def getUserConversation(self, fields):
    ret = {}
    ret["userA"] = fields["userA"]
    ret["userB"] = fields["userB"]
    ret["messages"] = []
    convo = self.userCollection.conversations.find_one({"userA": ret["userA"], "userB": ret["userB"]})
    if (not convo):
        convo = self.userCollection.conversations.find_one({"userA": ret["userB"], "userB": ret["userA"]})
    if (convo):
      for m in convo["messages"]:
        ret["messages"].append(self.getMessage(m))
      return dumps(ret)
    else:
      return self.addConversation(ret)


  def getMessage(self, messageid):
    return self.userCollection.messages.find_one({"_id": ObjectId(messageid)})


  def addMessage(self, chatid, fields):
    newmessage = message()
    if (newmessage.checkDict(fields)):
      newmessage.setid( self.userCollection.messages.insert_one(fields).inserted_id )
      self.messages[newmessage.id] = newmessage

      convo = self.userCollection.conversations.find_one({ "_id": ObjectId(chatid) })
      convo['messages'].append( str(newmessage.id) )
      self.userCollection.conversations.update({ "_id": ObjectId(chatid) },convo)

      return "jee"
    else:
      return ";:<"

  def addUserMessage(self, fields):
    ret = {}
    ret["userA"] = fields["userA"]
    ret["userB"] = fields["userB"]
    convo = self.userCollection.conversations.find_one({"userA": ret["userA"], "userB": ret["userB"]})
    if (not convo):
        convo = self.userCollection.conversations.find_one({"userA": ret["userB"], "userB": ret["userA"]})
    if (convo):
      print(convo)
      messagefields = {
        "sender": fields['userA'],
        "conversation": str(convo['_id']),
        "text": fields['text'],
        "time": fields['time']
      }
      return self.addMessage(str(convo['_id']), messagefields)

    return ";:<"


  def addSkill(self, name):
    post = {"name": name,}
    return self.userCollection.skills.insert_one(post).inserted_id

