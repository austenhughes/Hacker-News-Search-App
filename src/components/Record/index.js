import React from "react";
import { Button } from '@material-ui/core';

function Record() {

    function handleFormSubmitClearHistory(){
        let historyCleared = '';
        localStorage.setItem("history", historyCleared)
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

    function showHistory() {
        return new Promise(resolve => {
            let historyArray = ""
            let historyStored = localStorage.getItem("history");
            historyArray = historyStored.split(',');
            resolve(historyArray);
        });
      }
      
      async function asyncCall() {
        const result = await showHistory();
        // console.log(result);
        for (let index = 1; index < result.length; index++) {
            const element = result[index];
            let historyListing = document.createElement("a");
            var linkText = document.createTextNode(element);
                historyListing.appendChild(linkText);
                historyListing.href = ("/hacker-news-search-app/#/search");
                historyListing.onclick = function(){
                // console.log(this.innerHTML)
                localStorage.setItem("searchAgain", this.innerHTML)
                  };
                document.getElementById("historyList").append(historyListing)
          
            let historyListingSpace = document.createElement("br");
            document.getElementById("historyList").append(historyListingSpace)

        }
      }
      
      asyncCall();

return (

    <div>
    <div className="record">
        <ul>
        <div className="historyList" id="historyList"></div>
        </ul>
    </div>

        <div className="btn">
        <Button 
            onClick={handleFormSubmitClearHistory} 
            className="btn" type="button" value="clear">Clear History
        </Button>
        </div>

    </div>

);
}

export default Record; 