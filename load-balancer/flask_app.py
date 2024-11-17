from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

COUNTER = 0
SERVERS = ["https://geturtickets.pythonanywhere.com/",
           "https://geturticket.pythonanywhere.com/"]


@app.route('/', methods=['GET'])
def round_robin():
    global COUNTER
    result = SERVERS[COUNTER % len(SERVERS)]
    COUNTER += 1
    return jsonify({"baseURL": result})


def create_app():
    return app


if __name__ == '__main__':
    app.run(debug=True)
