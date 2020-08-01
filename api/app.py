from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.secret_key = "fJm6?7Sb]+4Am0@4'^>E(@*2311_`4?}u]L1Z$^lV=y1Yk-Dkro4@C)*$']D>~sd)np57s>U"
CORS(app, resources={r'/api/*': {"origins": "*"}})

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=5000, threaded=True)
