import React, { useState} from "react";
import { Button } from '@material-ui/core';

function Searchbar(props) {

    let forCall = "";

    const [newSearch, setNewSearch] = useState({})

    asyncCall();

    function rerunSearch(){
        return new Promise(resolve => {
            let rerun = localStorage.getItem("searchAgain")
            // console.log(rerun)
            resolve(rerun)
        })
    };

    async function asyncCall(){
        const result = await rerunSearch();
        // console.log(result)
        if (result !== ""){
            // console.log(result)
            localStorage.setItem("searchAgain", "")
            forCall = result
            console.log(forCall)
            handleFormSubmitNewSearch();
        }
    };

    // const [newSearch, setNewSearch] = useState({})

    function handleInputChange(event) {
        const { value } = event.target;
        setNewSearch({...newSearch, value})
        };

    function handleFormSubmitNewSearch(event) {
        // event.preventDefault();

        clearLast ();
        function clearLast() {
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        const container = document.querySelector('#list');
        removeAllChildNodes(container);
        };

        // could be messy
        checkIfRerun();
        function checkIfRerun(){
            if(forCall !== ""){
            forCall = forCall;
            } else {
            forCall = newSearch.value;  
            }
        }


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

                let listing = document.createElement("div");
                listing.setAttribute("id", "history");

                let listingURL = document.createElement("a");
                var linkText = document.createTextNode(listURL);
                listingURL.appendChild(linkText);
                listingURL.href = listURL;

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
        
        <div className="bar">
        <div className="shift">
        <input
          onChange={handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className=""
          placeholder="search"
          id="search"
        />
        
        <button 
            onClick={handleFormSubmitNewSearch} 
            className="btn2" type="button" value="Search">Search
        </button>

        </div>
        </div>

        <ul>
        <div className="list" id="list"></div>
        </ul>

        </div>
);

}

export default Searchbar; 