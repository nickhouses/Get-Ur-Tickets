from waitress import serve
from flask_cors import CORS
from flask import Flask, request
from processing import get_total_price

app = Flask(__name__)
CORS(app)


@app.route('/test', methods=['POST'])
def get_query_from_react():
    """
    :return: The JSON results for the front end to pick up
    """
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']

    return {'result': get_total_price(origin_airport_code)}


if __name__ == '__main__':
    print('Server is running on localhost:5000')
    serve(app, host='localhost', port=5000)
