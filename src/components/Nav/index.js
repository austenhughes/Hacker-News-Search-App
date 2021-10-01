import React from "react";
import { Button } from '@material-ui/core';

function Nav() {
return (
<div className="nav">
    <div className= "btnBlock">
    <a className="navBtn" href="/hacker-news-search-app/#/search">Search</a>
    <a className="navBtn" href="/hacker-news-search-app/#/history">History</a>
    </div>
</div>
);
}

export default Nav; 