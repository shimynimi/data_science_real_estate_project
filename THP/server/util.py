# we want to get the addresses from columns.json
import json
import pickle
import numpy as np
# import sklearn


__addresses = None
__data_columns = None
__model = None

# dummy


def get_estimated_price(address, sqm, room, parking, warehouse, elevator):
    try:
        adr_index = __data_columns.index(address.lower())
    except:
        adr_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqm
    x[1] = room
    x[2] = parking
    x[3] = warehouse
    x[4] = elevator
    if adr_index >= 0:
        x[adr_index] = 1

    return __model.predict([x])[0]


def get_addresses():
    return __addresses


def load_saved_artifacts():
    print('loading saved artifacts...start')
    global __data_columns
    global __addresses

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __addresses = __data_columns[5:]

    global __model
    with open("./artifacts/TEHRAN_HOME_PRICES_MODEL.pickle", 'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_addresses())
    print(get_estimated_price('Shahran', 60, 2, 1, 1, 0))
    print(get_estimated_price('Narmak', 640, 5, 1, 1, 1))
