from flask import Flask
from flask_cors import CORS, cross_origin

from authentication.login import login_bp as authentication_bp_login
from authentication.registration import registration_bp as authentication_bp_registration
from authentication.google_oauth import google_oauth_bp as authentication_bp_google_oauth

app = Flask(__name__)
app.secret_key = "fJm6?7Sb]+4Am0@4'^>E(@*2311_`4?}u]L1Z$^lV=y1Yk-Dkro4@C)*$']D>~sd)np57s>U"
CORS(app, resources={r'/api/*': {"origins": "*"}})

app.register_blueprint(authentication_bp_login)
app.register_blueprint(authentication_bp_registration)
app.register_blueprint(authentication_bp_google_oauth)


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




if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=5000, threaded=True)
