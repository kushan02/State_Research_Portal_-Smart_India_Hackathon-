from flask import Blueprint, render_template, request
from flask import current_app as app
from flask_cors import CORS

import flask_bcrypt
import pymysql
import re

registration_bp = Blueprint('registration_bp', __name__)
