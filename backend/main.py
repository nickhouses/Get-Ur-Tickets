import json
import urllib.request
from encryption_functions import get_key, decrypt_file

KEY_FILE = 'key.encrypted'
CONSTANTS_FILE = 'constants.env'
TICKET_API_KEY, FLIGHT_API_KEY = decrypt_file(CONSTANTS_FILE, get_key(KEY_FILE))

exit()

def main():
    origin = 'LAS'
    airports = {('Miami Gardens', 'FL'): 'MIA',
                ('Montreal', 'QC'): 'YUL',
                ('Las Vegas', 'NV'): 'LAS',
                ('Austin', 'TX'): 'AUS'}

    with urllib.request.urlopen('https://api.seatgeek.com/2/events?performers.slug=formula-1&per_page=100&format=json&client_id=' + TICKET_API_KEY) as url:
        data = json.load(url)

    for i in range(data['meta']['total']):
        curr_event = data['events'][i]
        venue = curr_event['venue']
        location = (venue['city'], venue['state'])
        title = curr_event['short_title']

        if ('Sunday' in title or ('Saturday' in title and 'Vegas' in title)) and 'Pass' not in title:
            # curr_event['visible_until_utc']

            date = curr_event['datetime_local'].split('T')[0]
            destination = airports[location]

            if destination != origin:
                with urllib.request.urlopen('https://serpapi.com/search.json?engine=google_flights&output=json&departure_id=LAS&arrival_id=' + destination + '&outbound_date=' + date + '&return_date=' + date + '&api_key=' + FLIGHT_API_KEY) as url:
                    flights = json.load(url)

                print(title, curr_event['stats']['lowest_price'] + flights['price_insights']['lowest_price'])
            else:
                print(title, curr_event['stats']['lowest_price'])

main()
