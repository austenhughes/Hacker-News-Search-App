import React, { useState} from "react";

function SearchBox(props) {
    let forCall = "";
    const [newSearch, setNewSearch] = useState({})
        // checks if this is a search being run again or if it is fresh search
    asyncCall();
    function rerunSearch(){
        return new Promise(resolve => {
        // checks local storage for search again element
            let rerun = localStorage.getItem("searchAgain")
            resolve(rerun)
        })
    };
    async function asyncCall(){
        // if local storage is holding a search to be searched again the program will run that search
        // if not the page will stay clear 
        const result = await rerunSearch();
        if (result !== ""){
            localStorage.setItem("searchAgain", "")
            forCall = result
            console.log(forCall)
            handleFormSubmitNewSearch();
        }
    };
    function handleInputChange(event) {
        const { value } = event.target;
        setNewSearch({...newSearch, value})
        };
        // generates search results and writes to page 
    function handleFormSubmitNewSearch(event) {
        // clears results from last search   
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
        // set search value for search
        checkIfRerun();
        function checkIfRerun(){
            if(forCall !== ""){
            // will run if page is being pulled for a rerun of a past search
            forCall = forCall;
            } else {
            //  will run if page is being generated for a new search 
            forCall = newSearch.value;  
            }
        }
            // pulls search history and adds new search storing it in local storage to be picked up on the history page
        let historyStored = localStorage.getItem("history");
        let newHistory = historyStored + " ," + forCall
        localStorage.setItem("history", newHistory);
            // API call to get search results
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
            // create divs with names of top 20 relevant articles
                let listing = document.createElement("div");
                listing.setAttribute("id", "history");
            //  creates hyperlinks of top 20 relevant articles
                let listingURL = document.createElement("a");
                var linkText = document.createTextNode(listURL);
                listingURL.appendChild(linkText);
                listingURL.href = listURL;
            // sets what will be on the above divs and hyperlinks
                let listText = document.createTextNode(listItem)
                let listTextURL = document.createTextNode(listURL)
                listing.appendChild(listText);
                listingURL.appendChild(listTextURL);
            // write divs and hyperlinks to page
                document.getElementById("list").append(listing)
                document.getElementById("list").append(listingURL)
            });
        });
          };

           // sets search and display structure

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

export default SearchBox; 