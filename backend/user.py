

class user:

  def __init__(self):
    self.checks = {
      "name": self.nameCheck,
      "email": self.emailCheck,
      "coords": self.coordinateCheck,
      "imageURL": self.nameCheck,
      "skills": self.skillCheck,
      "interests": self.skillCheck,
    }

  def checkDict(self, entry):
    print(entry, self.checks)
    return all ( k in entry for k in self.checks.keys() ) and all( self.checks[k](entry[k]) for k in entry)

  def nameCheck(self, name):
    return isinstance(name, str)

  def emailCheck(self, email):
    return isinstance(email, str) and "@" in email and "." in email

  def coordinateCheck(self, coords):
    return (not isinstance(coords, str)) and all( isinstance(coord, float) for coord in coords ) and len(coords) == 2

  def skillCheck(self, skills):
    return (not isinstance(skills, str)) and all( isinstance(skill, str) for skill in skills )



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