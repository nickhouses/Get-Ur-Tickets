import os
import csv
import json
import datetime
import requests
from encryption_functions import get_key, decrypt_file

#KEY_FILE = 'key.encrypted'
#CONSTANTS_FILE = 'constants.env'
#TICKET_API_KEY, SERP_API_KEY = decrypt_file(CONSTANTS_FILE,
#                                            get_key(KEY_FILE))

TICKET_API_KEY = os.getenv('TICKET_API_KEY')
SERP_API_KEY = os.getenv('SERP_API_KEY')

# create a session for keep alive
session = requests.Session()


def no_flight_info() -> dict:
    """
    :return: Dictionary of Flight Information
    """
    return {'Price': 0,
            'URL': '',
            'Airline': '',
            'Logo': '',
            'Travel_Class': ''}


def get_flight_info(origin: str, destination: str, start_date: str,
                    end_date: str) -> dict:
    """
    :param origin: 3-letter origin airport code
    :param destination: 3-letter destination airport code
    :param start_date: Date of outbound flight (%mm-%dd-%YYYY)
    :param end_date: Date of inbound flight (%mm-%dd-%YYYY)
    :return: Dictionary of Flight Information
    """
    response = session.get(
        f'https://serpapi.com/search.json?engine=google_flights&output=json&'
        f'departure_id={origin}&arrival_id={destination}&outbound_date='
        f'{start_date}&return_date={end_date}&api_key={SERP_API_KEY}')

    response.raise_for_status()
    flights = response.json()

    best_flight = flights['best_flights'][0]['flights'][0]

    return {'Price': flights['price_insights']['lowest_price'],
            'URL': flights['search_metadata']['google_flights_url'],
            'Airline': best_flight['airline'],
            'Logo': best_flight['airline_logo'],
            'Travel_Class': best_flight['travel_class']}


def no_hotel_info() -> dict:
    """
    :return: Dictionary of Hotel Information
    """
    return {'Price': 0, 'URL': '', 'Name': ''}


def get_hotel_info(venue: str, start_date: str, end_date: str) -> dict:
    """
    :param venue: Location name using the '+' for spaces
    :param start_date: Date of outbound flight (%mm-%dd-%YYYY)
    :param end_date: Date of inbound flight (%mm-%dd-%YYYY)
    :return: Dictionary of Hotel Information
    """
    response = session.get(
        f'https://serpapi.com/search.json?engine=google_hotels&output=json&'
        f'q={venue}+Hotels&check_in_date={start_date}&check_out_date='
        f'{end_date}&api_key={SERP_API_KEY}')

    response.raise_for_status()
    hotels = response.json()

    best_hotel = hotels['properties'][0]

    if 'rate_per_night' not in best_hotel:
        return no_hotel_info()

    return {'Price': 2 * best_hotel['rate_per_night']
            ['extracted_before_taxes_fees'],
            'URL': best_hotel['link'],
            'Name': best_hotel['name']}


def get_total_price_from_file(origin: str = 'LAS') -> list:
    """
    :param origin: 3-letter origin airport code
    :return: A sorted list of all the total prices (flight + ticket)
    """
    test_file = 'formula-1.txt'
    result = []

    with open(test_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            row['Price'] = float(row['Price'])

            if row['Airport'] != origin:
                date = datetime.datetime.strptime(row['Date'], '%m-%d-%Y')
                start_date = str(date +
                                 datetime.timedelta(days=-1)).split(' ')[0]
                end_date = str(date + datetime.timedelta(days=1)).split(' ')[0]

                flights = get_flight_info(origin, row['Airport'], start_date,
                                          end_date)
                result.append((row['Price'] +
                               flights['price_insights']['lowest_price'],
                               row['Name']))
            else:
                result.append((row['Price'], row['Name']))

    result.sort()
    return result


def get_total_price_from_api(origin: str = 'LAS',
                             keyword: str = 'formula-1') -> str:
    """
    :param origin: 3-letter origin airport code
    :param keyword: Keyword to pass as
    :return: A sorted list of all the total prices (flight + ticket)
    """
    airports = {'Miami+Gardens+Florida': 'MIA',
                'Montreal+Quebec': 'YUL',
                'Las+Vegas+Nevada': 'LAS',
                'Austin+Texas': 'AUS',
                'México+Ciudad+de+México': 'MEX',
                'Albert+Park+Victoria': 'MEL'
                }

    result = []

    response = session.get(f'https://app.ticketmaster.com/discovery/v2/events.'
                           f'json?apikey={TICKET_API_KEY}&keyword={keyword}')
    response.raise_for_status()
    data = response.json()

    day_ahead = datetime.datetime.today() + datetime.timedelta(days=1)

    for event in data['_embedded']['events']:
        event_date = event['dates']['start']['localDate']
        event_date = datetime.datetime.strptime(event_date, '%Y-%m-%d')

        if ('url' in event and 'priceRanges' in event and day_ahead.
                date() < event_date.date()):
            name = event['name']
            ticket_url = event['url']
            ticket_price = float(event['priceRanges'][0]['min'])

            location = event['_embedded']['venues'][0]

            city = location['city']['name'].replace(' ', '+')
            state = location['state']['name'].replace(' ', '+')

            venue = city + '+' + state

            if airports[venue] == origin:
                flight = no_flight_info()
                hotel = no_hotel_info()

            else:
                flight_start_date = str(event_date +
                                        datetime.timedelta(days=-1)).split(
                    ' ')[0]
                flight_end_date = str(event_date +
                                      datetime.timedelta(days=1)).split(' ')[0]

                flight = get_flight_info(origin, airports[venue],
                                         flight_start_date, flight_end_date)
                hotel = get_hotel_info(venue, flight_start_date,
                                       flight_end_date)

            result.append({'Total_Price': ticket_price +
                           flight['Price'] + hotel['Price'],
                           'Name': name,
                           'Venue': venue,
                           'Ticket_Price': ticket_price,
                           'Ticket_URL': ticket_url,
                           'Flight': flight,
                           'Hotel': hotel,
                           })

    return json.dumps(sorted(result, key=lambda x: x['Total_Price']))


if __name__ == '__main__':
    print(get_total_price_from_api())
