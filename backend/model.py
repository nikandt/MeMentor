class model:
  def __init__(self):
    self.id = None
    self.checks = {}

  def setid(self, mongoid):
    self.id = mongoid

  def checkField(self, entry):
    return entry.keys() < self.checks.keys()

  def checkDict(self, entry):
    print(self.checks, entry)
    return all ( k in entry for k in self.checks.keys() ) and all( self.checks[k](entry[k]) for k in entry)
