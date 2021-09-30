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
        console.log(result);
        result.forEach(element => {
            let historyListing = document.createElement("li");
            let historyListItem = element;
            let historyListText = document.createTextNode(historyListItem)
            historyListing.appendChild(historyListText);
            console.log(historyListing);
            document.getElementById("historyList")
            .append(historyListing);
        });
      }
      
      asyncCall();

return (

    <div>
    <div className="record">
        <ul>
        <li className="historyList" id="historyList"></li>
        </ul>
    </div>

        <Button 
            onClick={handleFormSubmitClearHistory} 
            className="btn" type="button" value="clear">clear
        </Button>

    </div>

);
}

export default Record; 