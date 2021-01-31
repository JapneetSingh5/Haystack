from elastic import ES
from scraped import data
import os


def main():
    es = ES()

    #Ignore, meant for testing
    # print(len(data))
    # print(data[499])
    # for i in range(2000, 2500):
    #     print(str(i) + " " + data[i]['url'])

    #Bulk add docs to the elasticsearch inndex
    # es.bulk_add('dump.json')

    q = input('Enter query string: ')
    res = es.search(q)
    print("Got %d Hits:" % res['total']['value'])
    for hit in res['hits']:
        print(hit['_source']['doc']['url'])


if __name__=='__main__':
    main()