from datetime import datetime
from elasticsearch import Elasticsearch
from elasticsearch import helpers
import base64
import json

# es = Elasticsearch()

# doc = {
#     'author': 'kimchy',
#     'text': 'Elasticsearch: cool. bonsai cool.',
#     'timestamp': datetime.now(),
# }
# res = es.index(index="test-index", id=1, body=doc)
# print(res['result'])

# res = es.get(index="test-index", id=1)
# print(res['_source'])

# es.indices.refresh(index="test-index")

# res = es.search(index="test-index", body={"query": {"match_all": {}}})
# print("Got %d Hits:" % res['hits']['total']['value'])
# for hit in res['hits']['hits']:
#     print("%(timestamp)s %(author)s: %(text)s" % hit["_source"])

class ES(object):
    index = "webpages"
    def __init__(self, host='localhost', port=9200):
        self.es = Elasticsearch([{
            'host':host,
            'port':9200
            }])
        self.create_index()


    def create_index(self):
        if not self.es.indices.exists(index=self.index):
            self.es.indices.create(index=self.index)

    def gen_id(self, url):
        url_bytes = url.encode('ascii')
        base64_bytes = base64.b64encode(url_bytes)
        base64_url = base64_bytes.decode('ascii')
        return base64_url


    def add_doc(self, dic):
        self.es.index(index=self.index, doc_type='_doc', id=self.gen_id(dic['url']), body=dic)

    def bulk_add(self, file):
        def gendata():
            fp = open(file)
            doc = json.load(fp)
            del doc[335]
            del doc[476]
            del doc[1234]
            del doc[2275]
            # print(len(doc))
            for i in range(len(doc)):
                yield {
                    "_id": self.gen_id(doc[i]['url']),
                    "_op_type":"index",
                    "_index": self.index,
                    # "_type": "_doc",
                    "doc": doc[i]
                }
        helpers.bulk(self.es, gendata())


    def search(self, query_string):
        fuzziness = 3
        if len(query_string)<3:
            fuzziness = 0 
        elif len(query_string)<10:
            fuzziness = 3
        else:
            fuzziness = 5

        res = self.es.search(index="webpages", body={
            "query": {
                # "match_all": {

                # }
                "match": {
                    "doc.body": {
                        "query" : query_string,
                        "auto_generate_synonyms_phrase_query" : True,
                        "lenient" : True,
                        "fuzziness" : fuzziness,
                    }
                }
            }
            })
        return res['hits']


