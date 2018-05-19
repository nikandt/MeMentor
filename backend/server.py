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
      fields["skills"] = list(set(fields["skills"]))
      fields["interests"] = list(set(fields["interests"]))
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

  def getAllConversations(self):
    return dumps( self.userCollection.conversations.find() )

  def getConversations(self, fields):
    convos = []
    userid = fields["userA"]
    achats = list(self.userCollection.conversations.find({"userA": userid}))
    bchats = list(self.userCollection.conversations.find({"userC": userid}))
    if (achats):
      convos.extend( achats )
    if (bchats):
      convos.extend( bchats )
    return dumps( convos )

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
      ret["messages"] = list(self.userCollection.messages.find({"conversation": str(convo["_id"])}))
      ret["userA"] = self.userCollection.users.find_one({"_id": ObjectId(ret["userA"])})
      ret["userB"] = self.userCollection.users.find_one({"_id": ObjectId(ret["userB"])})
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

  def getMatches(self, userid):
    u = self.userCollection.users.find_one({"_id": ObjectId(userid)})
    potential = []
    matches = []
    for s in u["skills"]:
      potential.extend( list(self.userCollection.users.find({"interests": s})))
    ids = set([str(k["_id"]) for k in potential])
    ppotential = []
    for p in potential:
      if str(p["_id"]) in ids:
        ppotential.append(p)
        ids.remove(str(p["_id"]))
    potential = ppotential
    for m in potential:
      if ( not set(m["skills"]).isdisjoint(set(u["interests"]))):
        matches.append(m)
    return dumps(matches)

  def addSkill(self, name):
    post = {"name": name,}
    return self.userCollection.skills.insert_one(post).inserted_id

