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
        // console.log(newSearch);
        let forCall = newSearch.value;
        console.log(forCall)

        fetch(
            "http://hn.algolia.com/api/v1/search?query="+forCall+"&tags=story"
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let information = data
            console.log(information)
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
       
        </div>
);

}

export default Searchbar; 