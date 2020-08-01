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


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=5000, threaded=True)
