from elastic import ES
from scraped import data


def take_query(es):
    while True:
        q = input('Enter query string: ')
        results = es.search(q)
   
        for i in range(min(len(results),3)):
            r = results[i]
            print(r['_score'], r['_source']['url'])


def main():
    es = ES()
    es.add_doc("test", data[0]['url'], data[0]['body'])
    # es = ES()
    # es.create_index()
    # print(data)
    # for(x in data):
    #     print(x)
    # for(i in range(len(data))):
    #     es.add_doc("Test", data[i]['url'], data[i]['body'])
    
    #take_query(es)


if __name__=='__main__':
    main()