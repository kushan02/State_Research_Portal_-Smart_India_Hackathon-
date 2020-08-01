import time
start_time = time.time()

import logging
from elasticsearch import Elasticsearch
logging.basicConfig(level=logging.ERROR)


def connect_elasticsearch(url = 'localhost', port = 9200):
    _es = None
    _es = Elasticsearch([{'host': url, 'port': port}])
    if _es.ping():
        print('Connection to ' + url + ':' + str(port) + ' successful')
    else:
        print('Ping failed, some error in connection. Check the logs')
    return _es


es = connect_elasticsearch()