from time import time

from validators import *
from model import model


class conversation:

  def __init__(self, userA, userB):
    self.id = None
    self.checks = {
      "userA": stringcheck,
      "userB": stringcheck,
      "messages": stringlistscheck,
    }
    self.users = [userA, userB]

class message(model):
  def __init__(self, sender, text):
    self.checks = {
      "sender": stringcheck,
      "conversation": stringcheck,
      "text": stringcheck,
      "time": floatcheck,
    }
