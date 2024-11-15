from flask import Flask, request
from flask_cors import CORS
from processing import get_total_price_from_api
import logging

app = Flask(__name__)
CORS(app)

# Clear the log file on startup
open('output.log', 'w').close()

# Configure logging to output to a file
logging.basicConfig(
    filename='output.log',  # Log messages will be written to this file
    level=logging.INFO,  # Set the logging level
    format='%(asctime)s - %(levelname)s - %(message)s',
)


@app.route('/', methods=['GET'])
def hello():
    app.logger.info('Hello World endpoint was accessed.')
    return 'Hello World!'


@app.route('/result', methods=['POST'])
def get_best_prices():
    """
    Handle POST request to get best prices.
    :return: The JSON results for the front end to pick up
    """
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']
    keyword = json_request['keyword']

    app.logger.info(
        f'Received request with originAirportCode: {origin_airport_code} '
        f'and keyword: {keyword}'
    )

    # Get total price from API
    result = get_total_price_from_api(origin_airport_code, keyword)

    app.logger.info(f'Returning result to frontend: {result}')
    return result


def create_app():
    return app
