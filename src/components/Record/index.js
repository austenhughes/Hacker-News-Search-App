import React from "react";

function Record() {

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

    <div className="record">
        <ul>
        <li className="historyList" id="historyList"></li>
        </ul>
    </div>

);
}

export default Record; 