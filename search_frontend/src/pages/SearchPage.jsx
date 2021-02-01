import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../stateProvider";
import search from "../search";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Response from "../response";
function SearchPage() {
  const [{ term }] = useStateValue();
  const { data } = search(term);
  // const data = Response;
  console.log(data);
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
          <Search hideButtons />
        </div>
      </div>
      {/* true / term */}
      {data && term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data['hits']['total']['value']} results for {term}
          </p>
        </div>
      )}
      {
        data && data['hits']['hits'].map((item) => (
        <div className="searchPage__result">
          <a className="searchPage__resultLink" href={item['_source']['doc']['url']}>
            {item['_source']['doc']['url']}
          </a>
          <a href={item['_source']['doc']['url']} className="searchPage__resultTitle">
            <h2>{item['_source']['doc']['url']}</h2>
          </a>
          <p className="searchPage__resultSnippet">{item['_source']['doc']['url']}</p>
        </div>
      ))
    }
    </div>
  );
}

export default SearchPage;
