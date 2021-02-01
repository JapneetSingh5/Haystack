from pymongo.collection import Collection
from collections import OrderedDict

# Schema for URL insertion
vexpr = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["url", "crawl_details", "watcher_ignore"],
        "properties": {
            "url": {
                "bsonType": "string",
                "description": "URL that is to be crawled (required)"
            },
            "crawl_details": {
                "bsonType": ["array"],
                "items": {
                    "bsonType": ["object"],
                    "required": ["crawled_on", "response_code"],
                    "additionalProperties": False,
                    "properties": {
                        "crawled_on": {
                            "bsonType": "date",
                            "description": "date on which site was crawled",
                        },
                        "response_code": {
                            "bsonType": "int",
                            "description": "response code received for this crawl",
                            "minimum": 100,
                            "maximum": 599,
                        }
                    },
                },
                "description": "details of crawls (required)"
            },
        }
    }
}

# Only work on those URLs for now which haven't been crawled even one
# TODO: Can potentially take this from spider as argument
pipeline = [
    {"$match": {
        "fullDocument.crawl_details": {
            "$size": 0,
        },
    }}
]


class MongoWatcher():
    collection_name = MONGO_COLLNAME

    def _set_validator(self) -> None:
        """
        Sets validator on self.db as defined by the validator scheme vexpr
        """

        if (self.collection_name not in self.db.list_collection_names()):
            self.db.create_collection(self.collection_name)

        cmd = OrderedDict([('collMod', self.collection_name),
                           ('validator', vexpr),
                           ('validationLevel', 'moderate')])
        self.db.command(cmd)

    def __init__(self, collection: Collection) -> None:
        self.collection = collection
        self._set_validator()

    def watch(self) -> None:
        with self.collection.watch(pipeline=pipeline) as stream:
            for change in stream:
                yield change

        # try:
        #     self.collection.update_one(
        #         {"url": "yay"},
        #         {
        #             "$push": {
        #                 "crawl_details": {
        #                     "crawled_on": datetime.utcnow(),
        #                     "response_code": 200,
        #                 }
        #             }
        #         },
        #         True  # upsert
        #     )
        # except:
        #     print('awww')
        #     raise
        # print("Success!")
