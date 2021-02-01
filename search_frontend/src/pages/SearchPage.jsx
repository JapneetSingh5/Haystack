import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../stateProvider";
import useSearch from "../search";
import { Link } from "react-router-dom";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Response from "../response";
import { actionTypes } from "../reducer";
import logo from './LogoSVGWhiteBG.svg'

function SearchPage({query}) {
  const [{ term, data }] = useStateValue();
  useSearch(term);
  console.log(term)
  console.log(data)
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
      {!data && <img src="https://i.gifer.com/4V0b.gif" />}
      {data && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data['hits']['total']['value']} results for <strong>{term}</strong> ({data['took']} milliseconds)
          </p>
        </div>
      )}
      { data &&
        data['hits']['hits'].map((item) => (
        <div className="searchPage__result">
          <a href={item['_source']['doc']['url']} className="searchPage__resultTitle">
            <h2>{item['_source']['doc']['url']}</h2>
          </a>
          <a className="searchPage__resultLink" href={item['_source']['doc']['url']}>
            {item['_source']['doc']['url']}
          </a>
        </div>
      ))
    }
    </div>
  );
}

export default SearchPage;
