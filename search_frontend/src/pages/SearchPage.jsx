import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { actionTypes } from "../reducer";
import { useStateValue } from "../stateProvider";
import triggerSearch from "../search";
import { Link } from "react-router-dom";
import Search from "./Search";
import logo from './LogoSVGWhiteBG.svg'
import Pagination from '@material-ui/lab/Pagination';

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'http://localhost:9200/' 
    // http://localhost:9200/ 
    // http://root:12345@localhost:9200/ 
    // If you have set username and password
});

function SearchPage({query}) {
  const [{ term, data }, dispatch] = useStateValue();
  // const [{}, dispatch] = useStateValue();
  // triggerSearch(term, 1, 10);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    client.search({
      index: "webpages", // Your index name for example crud 
      body: {
        "from": (page-1)*10,
        "size": 10,
        "query": {
          "match": {
              "doc.body": {
                  "query" : term,
              }
          }
      }
      }
    }).then(function (resp) {
        dispatch({
          type: actionTypes.SET_RESULTS,
          data: resp,
          term: term,
        });
    }, function (err) {
      console.log(err.message);
    });
  }, [term, page])
  // console.log(term)
  // console.log(data)
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://cdn.pixabay.com/photo/2014/12/21/23/53/hay-576266_960_720.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons query={term} home={false} />
        </div>
        <img src={logo} alt="DevClub Logo" width="80" className="searchPage__logo2"/>
      </div>
      {!data && <img src="https://i.gifer.com/4V0b.gif" className ="loader" height="100"/>}
      {data && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            {data['hits']['total']['value']} hits for '<strong>{term}</strong>' ({data['took']} milliseconds)
          </p>
        </div>
      )}
      
      { data &&
        data['hits']['hits'].map((item) => (
        <div className="searchPage__result">
          <a href={item['_source']['doc']['url']} className="searchPage__resultTitle">
          <h2><img src={`http://www.google.com/s2/favicons?domain=`+item['_source']['doc']['url']}/>{" " + item['_source']['doc']['url']}</h2>
          </a>
          <a className="searchPage__resultLink" href={item['_source']['doc']['url']}>
            {item['_source']['doc']['url']}
          </a>
        </div>
      ))
    }
    {data && <Pagination count={data['hits']['total']['value']%10===0 ? data['hits']['total']['value']/10 : parseInt(data['hits']['total']['value']/10)+1 }  page={page} onChange={handleChange}/>}
    </div>
  );
}


export default SearchPage;
