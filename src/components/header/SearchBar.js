import React from "react";

const SearchBar = () => {
    const search = () => {
        console.log("Search not yet implemented")
    }

    return(
        <>
            <input type="text"></input>
            <button onClick={search}>search</button>
        </>
    )
}

export default SearchBar;
