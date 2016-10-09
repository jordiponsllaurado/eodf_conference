import csv     # imports the csv module
import sys      # imports the sys module
import pyrebase
import requests

user = None
config = {
    'apiKey': "AIzaSyDzVFtqSeQBld5UoPtTARd4htrf3WqZVj4",
    'authDomain': "eodf-5abd7.firebaseapp.com",
    'databaseURL': "https://eodf-5abd7.firebaseio.com",
    'storageBucket': "eodf-5abd7.appspot.com"
}

def setup_db():
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    global user
    user = auth.sign_in_with_email_and_password('test@gmail.com', 'adminadmin')
    db = firebase.database()
    return db

def write_db(db, data):
    results = db.child('results').push(data, user['idToken'])

db = setup_db()
f = open('EODF16_attendees_Sheet1.csv', 'r') # opens the csv file
try:
    reader = csv.reader(f)  # creates the reader object
    for row in reader:   # iterates the rows of the file in orders
        print(row)
        data = {"name": row[0], "surname": row[1], "country": row[2], "rfidID": ""}
        db.child('results').push(data, user['idToken'])
finally:
    f.close()      # closing
