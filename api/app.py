from flask import Flask, request, make_response
import json
from flask_cors import CORS, cross_origin
from elasticsearch import Elasticsearch

import re

from authentication.login import login_bp as authentication_bp_login
from authentication.registration import registration_bp as authentication_bp_registration
from user_profile.account_details import account_details_bp

app = Flask(__name__)
app.secret_key = "fJm6?7Sb]+4Am0@4'^>E(@*2311_`4?}u]L1Z$^lV=y1Yk-Dkro4@C)*$']D>~sd)np57s>U"
CORS(app, resources={r'/api/*': {"origins": "*"}}, support_credentials=True)
# app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(authentication_bp_login)
app.register_blueprint(authentication_bp_registration)
app.register_blueprint(account_details_bp)


# def connect_elasticsearch(url='localhost', port=9200):
def connect_elasticsearch(url='54.237.93.158', port=9200):
    # def connect_elasticsearch(url='9f164f7103f7.ngrok.io', port=443):
    _es = None
    _es = Elasticsearch([{'host': url, 'port': port}])
    # _es = Elasticsearch([{'host': url, 'port': port, 'use_ssl': True}])

    print(_es)

    if _es.ping():
        print('Connection to ' + url + ':' + str(port) + ' successful')
    else:
        print('Ping failed, some error in connection. Check the logs')
    return _es


es = connect_elasticsearch()


@app.route('/api/paper_details/', methods=['GET'])
@cross_origin()
def get_paper_details():
    paper_id = request.args.get("id")
    doc = {
        'size': 1,
        'query': {
            'match': {
                '_id': paper_id
            }
        }
    }
    # res = es.search(index='research_portal_default_shards', body=doc)
    res = es.search(index='research_portal', body=doc)
    return json.dumps(res)


@app.route('/api/security-logs/', methods=['POST'])
@cross_origin()
def get_security_logs():
    data = (request.json)
    user_id = data["user_id"]

    security_logs = [
        {"user_id": user_id, "ip": "192.168.2.1", "device": "Android Samsung Galaxy S8",
         "time": "2020-04-04T01:57:28+0000"},
        {"user_id": user_id, "ip": "123.456.21.1", "device": "Windows 10 Chrome Browser",
         "time": "2020-03-04T01:57:28+0000"},
        {"user_id": user_id, "ip": "111.168.2.1", "device": "Iphone IOS Safari",
         "time": "2019-04-04T01:57:28+0000"}
    ]

    return json.dumps(security_logs)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=5000, threaded=True)
