import React, { useState} from "react";
import { Button } from '@material-ui/core';

function Searchbar(props) {

    const [newSearch, setNewSearch] = useState({})

    function handleInputChange(event) {
        const { value } = event.target;
        setNewSearch({...newSearch, value})
        };

    function handleFormSubmitNewSearch(event) {
        event.preventDefault();

        clearLast ();
        function clearLast() {
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        const container = document.querySelector('#list');
        removeAllChildNodes(container);
        }

        let forCall = newSearch.value;
        let historyStored = localStorage.getItem("history");
        let newHistory = historyStored + " ," + forCall
        localStorage.setItem("history", newHistory);

        fetch(
            "http://hn.algolia.com/api/v1/search?query="+forCall+"&tags=story"
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let results = data;
            let info = results.hits;
            results = info
            info.forEach(element => {
                let listItem = element.title;
                let listURL = element.url

                let listing = document.createElement("li");
                listing.setAttribute("id", "history");

                let listingURL = document.createElement("a");
                var linkText = document.createTextNode("my title text");
                listingURL.appendChild(linkText);
                listingURL.title = listURL;
                listingURL.href = listURL;

                // listing.setAttribute("id", "history");
                // let listItem = element.title;
                // let listURL = element.url
                let listText = document.createTextNode(listItem)
                let listTextURL = document.createTextNode(listURL)
                listing.appendChild(listText);
                listingURL.appendChild(listTextURL);
                document.getElementById("list").append(listing)
                document.getElementById("list").append(listingURL)
            });
        });
          };

    return (
        <div className="searchbar">
        
        <input
          onChange={handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className=""
          placeholder="search"
          id="search"
        />
        
        <Button 
            onClick={handleFormSubmitNewSearch} 
            className="btn" type="button" value="Search">Search
        </Button>

        <ul>
        <li className="list" id="list"></li>
        </ul>

        </div>
);

}

export default Searchbar; 