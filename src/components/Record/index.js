import React from "react";

function Record() {

            // function to clear search history from both the local storage and the page
    function handleFormSubmitClearHistory(){
            // removes from local storage
        let historyCleared = '';
        localStorage.setItem("history", historyCleared)
            // removes from page
        clearLast ();
        function clearLast() {
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        const container = document.querySelector('#historyList');
        removeAllChildNodes(container);
        }
    }

            // async function to pull history from local storage and load it page when done 
    function showHistory() {
            // this pice retrieves the search history string and breaks it into a usable array 
        return new Promise(resolve => {
            let historyArray = ""
            let historyStored = localStorage.getItem("history");
            historyArray = historyStored.split(',');
            resolve(historyArray);
        });
      }
            //   picks up the search history information and displays it on the page one at a time 
      async function asyncCall() {
        const result = await showHistory();
        for (let index = 1; index < result.length; index++) {
            const element = result[index];
            // builds eliment to be added to page
            let historyListing = document.createElement("a");
            // sets element up to search again when clicked 
            var linkText = document.createTextNode(element);
                historyListing.appendChild(linkText);
                historyListing.href = ("/hacker-news-search-app/#/search");
                historyListing.onclick = function(){
                localStorage.setItem("searchAgain", this.innerHTML)
                  };
            // adds to page
                document.getElementById("historyList").append(historyListing)
            // build and add line break 
            let historyListingSpace = document.createElement("br");
                document.getElementById("historyList").append(historyListingSpace)

        }
      }
      
      asyncCall();

            // sets history display structure
return (
    <div>
    <div className="record">
        <ul>
        <div className="historyList" id="historyList"></div>
        </ul>
    </div>

        <button 
            onClick={handleFormSubmitClearHistory} 
            className="btn" type="button" value="clear">Clear History
        </button>

    </div>

);
}

export default Record; 