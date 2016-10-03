#! /usr/bin/python
import serial
import array
import requests
from firebase import firebase

point_id_list = {012345: 5, 012345: 5, 012345: 3}


while True:

    #Check number of points to add
    new_input_number = raw_input('Enter number of points:')
    points = 0
    if new_input_number in point_id_list.keys
        points = point_id_list[new_input_number]

    #Check id where points will be added
    new_id_number = raw_input('Enter your ID number:')

    #Check if id points already exist in database
    #TODO: Handle authentication
    id_request = requests.get('firebase_url' + id_number + '/' + points_column , auth=('user', 'pass'))
    if id_request == 200
        print('You already scored in this activity!')
    else
        post_request = requests.post('firebase_url' + id_number + '/' + points_colum, auth=('user', 'pass'))
        print 'Added ' + points + ' to attendant ' + id_number

    #TODO: Reset state if something goes wrong
