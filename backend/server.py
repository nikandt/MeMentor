from pymongo import MongoClient

class server:
  def __init__(self):
    self.port = 27017
    #password
    self.client = MongoClient("mongodb+srv://jebujebu:jebujebunsalasanaananas@junctiontsinghua-rfzol.mongodb.net/test")
    self.db = self.client['test']
    self.userCollection = self.db["user_collection"]

  def addUser(self, name):
    post = {"author": name,}

    print( self.userCollection.posts.insert_one(post).inserted_id )
    return "jee"

  def getUsers(self):
    ret = []
    cursor = self.userCollection.posts.find()
    print(cursor)
    for user in cursor:
      print(user)
      ret.append( user['author'] )
    return ", ".join(ret)