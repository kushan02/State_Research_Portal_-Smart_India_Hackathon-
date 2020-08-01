from flask import Blueprint, render_template, request
from flask import current_app as app
from flask_cors import CORS

import flask_bcrypt
import pymysql
import re

registration_bp = Blueprint('registration_bp', __name__)

@api_bp.route('/reg', methods=['GET', 'POST'])
def data_reg():
    if request.method == 'POST':

        data = (request.json)
        print(data)
        if data['fname'] == '' or data['email'] == '' or data['password'] == '' or data['cpass'] == '' or data['city'] == '' or data['institute'] == '':
            bool_no_null_input = False
        else:
            bool_no_null_input = True

        # Email Validation
        e_mail = data['email']

        regex_email = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        if re.search(regex_email,e_mail):
            bool_valid_email = True
        else:
            bool_valid_email = False

        #password validation
        pass_hash = bcrypt.generate_password_hash(data['password'])
        print(pass_hash)
        pass_hash = pass_hash.decode("utf-8")
        conf_pass = data['cpass']

        if bcrypt.check_password_hash(pass_hash,conf_pass):
            bool_valid_pass = True
        else:
            bool_valid_pass = False

        # phone number validation
        p_no = data['phone_number']
        regex_p_no = re.compile('[6-9][0-9]{9}')
        bool_valid_phone = bool(re.match(regex_p_no, p_no))

        # homepage url validation
        hp_url = data['hp']
        regex_hp = re.compile(
            r'^(?:http|ftp)s?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)

        bool_valid_hp = bool(re.match(regex_hp, hp_url))

        regex_email = re.compile('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
        bool_valid_email = bool(re.match(regex_email, e_mail))


        print(bool_valid_email)
        print(bool_valid_pass)


        # if bool_valid_email == True and bool_valid_pass == True and bool_no_null_input == True:
            if bool_valid_email == True and bool_valid_pass == True and bool_no_null_input == True and bool_valid_phone == True and bool_valid_hp == True:
            sql = "INSERT INTO users(NAME, EMAIL, PASSWORD, INSTITUTE, CITY, HOMEPAGE, BIO, PHONE_NUMBER) VALUES" + "(" + "'" + (
                str(data['fname'])) + "'" + "," + "'" + (str(data['email'])) + "'" + "," + "'" + (
                      str(pass_hash)) + "'" + "," + "'" + (
                      str(data['institute'])) + "'" + "," + "'" + (str(data['city'])) + "'" + "," + "'" + (
                      str(data['hp'])) + "'" + "," + "'" + (
                      str(data['bio'])) + "'" + "," + "'" + (str(data['phone_number'])) + "'" + ")"
            print(sql)
            try:
                cursor.execute(sql)
                db.commit()
            except:
                db.rollback()
        else:
            return abort(404,'Wrong/Invalid Data')


        cursor.execute("select * from users")
        data = cursor.fetchall()
        print(data)
    return "registered"
