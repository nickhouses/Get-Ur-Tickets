from waitress import serve
from flask_cors import CORS
from flask import Flask, request
from processing import get_final_result

app = Flask(__name__)
CORS(app)

@app.route('/test', methods = ['POST'])
def get_query_from_react():
    json_request = request.get_json()
    origin_airport_code = json_request['originAirportCode']
    
    return {'result': get_final_result(origin_airport_code)}

if __name__ == '__main__':
    serve(app, host='localhost', port=5000)
