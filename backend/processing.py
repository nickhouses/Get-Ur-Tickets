import csv
import json
import datetime
import urllib.request
from encryption_functions import get_key, decrypt_file

KEY_FILE = 'key.encrypted'
TEST_FILE = 'formula-1.txt'
CONSTANTS_FILE = 'constants.env'
TICKET_API_KEY, FLIGHT_API_KEY = decrypt_file(CONSTANTS_FILE, get_key(KEY_FILE))

def get_flight_info(origin: str, destination: str, start_date: str, end_date: str):
    with urllib.request.urlopen('https://serpapi.com/search.json?engine=google_flights&output=json&departure_id=' + origin + '&arrival_id=' + destination + '&outbound_date=' + start_date + '&return_date=' + end_date + '&api_key=' + FLIGHT_API_KEY) as url:
        flights = json.load(url)

    return flights

def get_final_result(origin: str) -> list:
    result = []

    with open(TEST_FILE, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            row['Price'] = float(row['Price'])

            if row['Airport'] != origin:
                date = datetime.datetime.strptime(row['Date'], "%m-%d-%Y")
                start_date = str(date + datetime.timedelta(days=-1)).split(' ')[0]
                end_date = str(date + datetime.timedelta(days=1)).split(' ')[0]

                flights = get_flight_info(origin, row['Airport'], start_date, end_date)
                result.append((row['Price'] + flights['price_insights']['lowest_price'], row['Name']))

                # result.append((row['Price'] + 200, row['Name']))
            else:
                result.append((row['Price'], row['Name']))

    result.sort()
    return result

if __name__ == "__main__":
    print(get_final_result('LAS'))
