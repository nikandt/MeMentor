def stringcheck(name):
  return isinstance(name, str)

def emailCheck(email):
  return isinstance(email, str) and "@" in email and "." in email

def coordinateCheck(coords):
  return (not isinstance(coords, str)) and all( isinstance(coord, float) for coord in coords ) and len(coords) == 2

def stringlistscheck(skills):
  return (not isinstance(skills, str)) and all( isinstance(skill, str) for skill in skills )

