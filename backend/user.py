

class user:

  def __init__(self):
    self.checks = {"name": self.nameCheck, "skills": self.skillCheck, "interests": self.skillCheck}

  def checkDict(self, entry):
    print(entry, self.checks)
    return all ( k in entry for k in self.checks.keys() ) and all( self.checks[k](entry[k]) for k in entry)

  def nameCheck(self, name):
    return isinstance(name, str)

  def skillCheck(self, skills):
    return (not isinstance(skills, str)) and all( isinstance(skill, str) for skill in skills )

