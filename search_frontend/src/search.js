import { useEffect, useState } from "react";
import { actionTypes } from "./reducer";
import { useStateValue } from "./stateProvider";

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'http://localhost:9200/' 
    // http://localhost:9200/ 
    // http://root:12345@localhost:9200/ 
    // If you have set username and password
});

// Check if Connection is ok or not
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


const Search = (term) => {
  const [data, setData] = useState(null);
  const [searching, setState] = useState(true);
  const [{}, dispatch] = useStateValue();
  searching && client.search({
    index: "webpages", // Your index name for example crud 
    body: {
      "query": {
        "match": {
            "doc.body": {
                "query" : term,
            }
        }
    }
    }
  }).then(function (resp) {
      setData(resp);
      setState(false);
      dispatch({
        type: actionTypes.SET_RESULTS,
        data: data,
        term: term,
      });
  }, function (err) {
    console.log(err.message);
  });
};

export default Search;