#! /usr/bin/python
import array
import pyrebase

point_id_list = {
    '0001734550': {'game': 'game_1', 'points': 5},
    '0000785709': {'game': 'game_2', 'points': 5},
    '0002855498': {'game': 'game_2', 'points': 10},
    '0000793871': {'game': 'game_2', 'points': 15},
    '0000116942': {'game': 'game_2', 'points': 20},
    '0004096571': {'game': 'game_2', 'points': 25},
    '0003964038': {'game': 'game_3', 'points': 10},
    '0003936302': {'game': 'game_3', 'points': 15},
    '0004141080': {'game': 'game_3', 'points': 25},
    '0000259784': {'game': 'game_3', 'points': 100}
}

reset_id_list = ['0004210288', '0000128012', '0004230940']

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

def write_db(db_user_hash, points):
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password('test@gmail.com', 'adminadmin')
    db = firebase.database()
    results = db.child('results').child(db_user_hash).update(points, user['idToken'])

def get_user_db(new_id_number):
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = auth.sign_in_with_email_and_password('test@gmail.com', 'adminadmin')
    db = firebase.database()

    child = db.child('results').order_by_child("rfidID").equal_to(new_id_number).get(user['idToken']).val()
    print(child)
    return child

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
        new_id_number = str(input('Enter your ID number:'))
        print(new_id_number)
        if new_id_number in reset_id_list:
            print('reseting application...')
            break

        #Check if id points already exist in database
        #db = setup_db()
        db_user = get_user_db(new_id_number)
        db_points = next (iter (dict(db_user).values()))[game]

        if (db_points == 0):
            points = {
                game: points_ammount
            }
            db_user_hash = list(db_user)[0]
            print(points)
            write_db(db_user_hash, points)
        else:
            print ('Points already scored for this activity')
