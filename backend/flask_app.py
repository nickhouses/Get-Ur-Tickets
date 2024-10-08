from flask import Flask, request
from processing import get_total_price_from_api
# import time

app = Flask(__name__)


@app.route("/", methods=['GET'])
def hello():
    return "Hello World!"


@app.route('/test', methods=['POST'])
def get_best_prices():
    """
    :return: The JSON results for the front end to pick up
    """
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']
    keyword = json_request['keyword']

    # Timing start
    # start_time = time.time()

    result = get_total_price_from_api(origin_airport_code, keyword)

    # Timing end and print
    # end_time = time.time()
    # print(f"Total request took {end_time - start_time:.2f} seconds")

    return {'result': result}


def create_app():
    return app
