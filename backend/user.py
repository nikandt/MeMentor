from validators import *
from model import model

class user(model):

  def __init__(self):
    self.id = None
    self.checks = {
      "name": stringcheck,
      "email": emailCheck,
      "coords": coordinateCheck,
      "imageURL": stringcheck,
      "skills": stringlistscheck,
      "interests": stringlistscheck,
    }

#example
"""
{
	"name": "DoubleJebu",
	"email": "jee.puu@jebu.com",
	"coords": [22.45, 5.5],
	"imageURL": "http://via.placeholder.com/256x256",
	"skills": ["C++", "Scala"],
	"interests": ["Cooking", "Gardening"]
}
"""