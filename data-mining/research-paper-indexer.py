import time
start_time = time.time()

import logging
import json

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

def delete_index(index):
    es.indices.delete(index=index, ignore=[400, 404])
# delete_index("research_portal")


def yield_record(file_path, encoding="utf8"):
    line_counter = 0
    with open(file_path, encoding=encoding) as f:
        for line in f:
            single_record = json.loads(line)
            
            line_counter = line_counter + 1
            paper_id = single_record['id']
            single_record['referenceCount'] = len(single_record['outCitations'])
            single_record["citationCount"] = len(single_record['inCitations'])
           
            single_record['relatedTopics'] = single_record.pop('entities')
            
            if line_counter % 10000:
                print(line_counter)
#                 single_record["relatedTopics"] = ["kushan", "mehta"]
            
            
            del single_record['id']
            del single_record['s2Url']
#             del single_record['inCitations']
#             del single_record['outCitations']
            del single_record['sources']
            del single_record["magId"]
            for author in single_record['authors']:
                del author['ids']
                
#             print(single_record)
#             print("")
            yield paper_id, single_record
           

    print("Inserted total " + str(line_counter) + " lines")
