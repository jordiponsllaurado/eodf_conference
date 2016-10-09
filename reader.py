#! /usr/bin/python
import array
import requests
import pyrebase

point_id_list = {'0000116942': {'game': 'game_01', 'points': 10}}
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
    user = auth.sign_in_with_email_and_password('test@gmail.com', 'adminadmin')
    db = firebase.database()
    return db

def write_db(db, data):
    results = db.child('results').push(data, user['idToken'])

#TODO: How to exactly read the ammount of points?
def read_db(db, id):
    db.child('results').child(id)


while True:

    #Check number of points to add
    new_input_number = str(input('Enter number of points:'))
    print(new_input_number)
    points_list = 0
    if new_input_number in point_id_list.keys():
        points_list = point_id_list[new_input_number]

    print(points_list)
    game = points_list['game']
    points_ammount = points_list['points']

    #Check id where points will be added
    new_id_number = input('Enter your ID number:')

    #Check if id points already exist in database
    db = setup_db()
    db_points = read_db(db, new_id_number)
    if (db_points == 0):
        write_db(db, data)
    else:
        print ('Points already scored for this activity')

    #TODO: Reset state if something goes wrong
