from flask import Blueprint, render_template, request
from flask import current_app as app
from flask_cors import CORS, cross_origin

import flask_bcrypt
import pymysql

login_bp = Blueprint('login_bp', __name__)
