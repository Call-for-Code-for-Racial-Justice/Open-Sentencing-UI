#!/usr/bin/env python3
# -*- coding: utf8 -*-

import pickle
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from schema import Schema, And, Or, SchemaError

app = Flask(__name__)
CORS(app)
model = pickle.load(open('model.pkl', 'rb'))

PREDICT_SCHEMA = Schema({
    'CHARGE_COUNT': int,
    'CHARGE_DISPOSITION': And(str, len),
    'OFFENSE_CATEGORY': And(str, len),
    'PRIMARY_CHARGE_FLAG': bool,
    'DISPOSITION_CHARGED_OFFENSE_TITLE': And(str, len),
    'DISPOSITION_CHARGED_CLASS': And(str, len),
    'SENTENCE_JUDGE': And(str, len),
    'SENTENCE_PHASE': And(str, len),
    'COMMITMENT_TERM': And(str, len),
    'COMMITMENT_UNIT': And(str, len),
    'LENGTH_OF_CASE_in_Days': Or(float, int),
    'AGE_AT_INCIDENT': Or(float, int),
    'RACE': And(str, len),
    'GENDER': And(str, len),
    'INCIDENT_CITY': And(str, len),
    'LAW_ENFORCEMENT_AGENCY': And(str, len),
    'LAW_ENFORCEMENT_UNIT': And(str, len),
    'SENTENCE_TYPE': And(str, len)
})

PREDICT_KEYS = [
    'OFFENSE_CATEGORY',
    'PRIMARY_CHARGE_FLAG',
    'DISPOSITION_CHARGED_OFFENSE_TITLE',
    'CHARGE_COUNT',
    'DISPOSITION_CHARGED_CLASS',
    'CHARGE_DISPOSITION',
    'SENTENCE_JUDGE',
    'SENTENCE_PHASE',
    'AGE_AT_INCIDENT',
    'GENDER',
    'LAW_ENFORCEMENT_AGENCY'
]

@app.route("/")
def index() -> str:
    return jsonify({"message": "It Works"})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = PREDICT_SCHEMA.validate(request.json)
    except SchemaError as error:
        return jsonify(message=str(error)), 404

    # Ensure that the data is in the correct order for the model
    data = {k: [data[k]] for k in PREDICT_KEYS}
    probability = model.predict(pd.DataFrame(data))

    return {
        'years_of_racial_bias_sentencing_discrepency': float(probability[0]),
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=8080)