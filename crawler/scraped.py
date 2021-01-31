import json 
  
# Opening JSON file 
with open('dump.json') as json_file: 
    data = json.load(json_file) 
    # print(len(data))
    # print("Type:", type(data)) 

# print(data[0]['url'])
# print(data[0]['request_meta'])
