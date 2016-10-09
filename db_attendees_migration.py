import csv     # imports the csv module
import sys      # imports the sys module

f = open('EODF16_attendees_Sheet1.csv', 'rb') # opens the csv file
try:
    reader = csv.reader(f)  # creates the reader object
    for row in reader:   # iterates the rows of the file in orders
        print row    # prints each row
finally:
    f.close()      # closing