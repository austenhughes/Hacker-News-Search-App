import React from "react";
import { Button } from '@material-ui/core';

function Nav() {
return (
<div className="nav">
    <Button className="btn" href="/hacker-news-search-app/#/search"><input 
    type="button" value="Search"/></Button>
    <Button className="btn" href="/hacker-news-search-app/#/history"><input 
    type="button" value="History"/></Button>
</div>
);
}

export default Nav; 