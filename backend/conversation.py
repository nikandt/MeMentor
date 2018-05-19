from time import time

from validators import *
from model import model


class conversation(model):
  def __init__(self):
    self.checks = {
      "userA": stringcheck,
      "userB": stringcheck,
      "messages": stringlistscheck,
    }

class message(model):
  def __init__(self):
    self.checks = {
      "sender": stringcheck,
      "conversation": stringcheck,
      "text": stringcheck,
      "time": floatcheck,
    }
