from flask import Flask, request, jsonify
import util


app = Flask(__name__)


@app.route('/get_addresses')
def get_addresses():
    response = jsonify({
        'addresses': util.get_addresses()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqm = float(request.form['total_sqm'])
    address = request.form['address']
    room = int(request.form['room'])
    parking = int(request.form['parking'])
    warehouse = int(request.form['warehouse'])
    elevator = int(request.form['elevator'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(address, total_sqm, room, parking, warehouse, elevator)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    print("Starting python flask server for home price prediction ... ")
    util.load_saved_artifacts()
    app.run()
