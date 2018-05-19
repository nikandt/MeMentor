

class user:
  fields = ["name", "skills", "interests"]

  def checkDict(self, entry):
    return all ( k in entry for k in self.fields )