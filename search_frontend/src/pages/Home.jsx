import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";
import Search from "./Search";
import logo from './LogoSVGWhiteBG.svg'
import haystack from './haystack.png'

function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <img src={logo} alt="DevClub Logo" width="100" />
        </div>
      </div>
      <div className="home__body">
        <img
          src={haystack}
          atl=""
          height="150"
        />
        <div className="home__inputContainer">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Home;
