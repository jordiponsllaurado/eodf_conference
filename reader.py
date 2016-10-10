#! /usr/bin/python
import array
import pyrebase

point_id_list = {'0000116942': {'game': 'game_01', 'points': 10}}
reset_id = '123456'

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

def write_db(db, user_id, data):
    db.child('results').child(user_id).update(data, user['idToken'])
    results = db.child('results').update(data, user['idToken'])

#TODO: How to exactly read the ammount of points?
def get_user_db(db, id):
    db.child('results').order_by_child("rfidID").equal_to(id).get(user['idToken']).val()

def create_db_data(game, points):
    data = {
        game: points
    }

while True:
    while True:

        #Check number of points to add
        new_input_number = str(input('Enter number of points:'))
        print(new_input_number)
        points_list = 0
        if new_input_number in point_id_list.keys():
            points_list = point_id_list[new_input_number]
        else:
            print('Wrong amount of points')
            break

        print(points_list)
        game = points_list['game']
        points_ammount = points_list['points']

        #Check id where points will be added
        new_id_number = input('Enter your ID number:')
        if new_id_number == reset_id:
            print('reseting application...')
            break

        #Check if id points already exist in database
        db = setup_db()
        db_user = get_user_db(db, new_id_number)
        db_points = next (iter (dict(db_user).values()))[game]

        if (db_points == 0):
            points = create_db_data(game, points_ammount)
            db_user_hash = list(db_user)[0]
            write_db(db, db_user_hash, points)
        else:
            print ('Points already scored for this activity')
