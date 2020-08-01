import json
import os
from datetime import datetime, timedelta

import flask
import pytz
import requests
from flask import Blueprint, render_template, request
from flask import current_app as app
from flask_cors import CORS

import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

google_oauth_bp = Blueprint('google_oauth_bp', __name__)
CORS(google_oauth_bp, resources=r'/api/*')

# When running locally, disable OAuthlib's HTTPs verification.
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
print("OAUTH_INSECURE_TRANSPORT = ", os.getenv('OAUTHLIB_INSECURE_TRANSPORT'))

PROJECT_ROOT = os.path.realpath(os.path.dirname(__file__))
CLIENT_SECRETS_FILE = os.path.join(PROJECT_ROOT, 'authentication/client_secret.json')
print("Client secret file path: ", CLIENT_SECRETS_FILE)

SCOPES = ['https://www.googleapis.com/auth/userinfo.profile email']
# Required otherwise gives scope changed error
os.environ['OAUTHLIB_RELAX_TOKEN_SCOPE'] = '1'


@google_oauth_bp.route('/api/google-outh-login/')
def login_google_oauth():
    # if not is_logged_in():
    #     flask.flash("You are not authorized to view this page until you login")
    #     print("User not authorized")
    return flask.redirect(flask.url_for('authorize'))


@google_oauth_bp.route('/authorize')
def authorize():
    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES)

    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true',
        # This ensures user is asked each time to login after logout
        prompt='login')

    # Store the state so the callback can verify the auth server response.
    flask.session['state'] = state

    # authorization_url stored in google console api, in our case 'oauth2callback'
    return flask.redirect(authorization_url)


@google_oauth_bp.route('/oauth2callback')
def oauth2callback():
    # Specify the state when creating the flow in the callback so that it can
    # be verified in the authorization server response.
    state = flask.session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
    flow.redirect_uri = flask.url_for('oauth2callback', _external=True)

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = flask.request.url
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    credentials = flow.credentials
    flask.session['credentials'] = credentials_to_dict(credentials)

    # Fetch the user email and name
    oauth2_client = googleapiclient.discovery.build(
        'oauth2', 'v2', credentials=credentials)
    # user_name = oauth2_client.people.get().execute()
    user_info = oauth2_client.userinfo().get().execute()

    # LOG the login to the database
    login_data = {}
    login_data['user_email'] = user_info["email"]
    login_data['user_name'] = user_info["name"]
    tz = pytz.timezone('Asia/Kolkata')
    login_data['timestamp'] = datetime.now(tz).strftime("%d-%b-%Y %a, %X")
    login_data["expiry"] = login_data["timestamp"] + timedelta(hours=24)

    # TODO implement security logs
    # login_logs.insert_one(login_data)

    return json.dumps(login_data)


@app.route('/revoke')
def revoke():
    if 'credentials' in flask.session:
        credentials = google.oauth2.credentials.Credentials(
            **flask.session['credentials'])

        revoke = requests.post('https://accounts.google.com/o/oauth2/revoke',
                               params={'token': credentials.token},
                               headers={'content-type': 'application/x-www-form-urlencoded'})

        status_code = getattr(revoke, 'status_code')

        # if status_code == 200:
        #     return 'Credentials successfully revoked.'
        # else:
        #     return 'An error occurred. Please report this bug to the developers!'
    flask.flash("authentication error", "error")
    return flask.redirect(flask.url_for('landing_page'))


def credentials_to_dict(credentials):
    return {'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes
            }