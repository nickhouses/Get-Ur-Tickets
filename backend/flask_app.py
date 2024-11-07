from flask import Flask, request
from flask_cors import CORS
from processing import get_total_price_from_api
import logging

app = Flask(__name__)
CORS(app)


open('output.log', 'w').close()

# Configure logging to output to a file
logging.basicConfig(
    filename='output.log',  # Log messages will be written to this file
    level=logging.INFO,  # Set the logging level
    format='%(asctime)s - %(levelname)s - %(message)s',  # Format of the log messages
)


@app.route('/', methods=['GET'])
def hello():
    app.logger.info('Hello World endpoint was accessed.')
    return 'Hello World!'

@app.route('/result', methods=['POST'])
def get_best_prices():
    """
    :return: The JSON results for the front end to pick up
    """
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']
    keyword = json_request['keyword']
    
    app.logger.info(f'Received request with originAirportCode: {origin_airport_code} and keyword: {keyword}')
    
    # Timing start
    # start_time = time.time()

    result = get_total_price_from_api(origin_airport_code, keyword)

    # Timing end and print
    # end_time = time.time()
    # app.logger.info(f"Total request took {end_time - start_time:.2f} seconds")

    app.logger.info(f'Returning result to frontend: {result}')
    return result

def create_app():
    return app
