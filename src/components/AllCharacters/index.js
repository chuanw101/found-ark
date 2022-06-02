import React from 'react';

function AllCharacters( {allChars} ){
    let allCharsEl = []
    console.log("helloooo")
    for (let i=0; i< allChars.length; i++){
       allCharsEl.push(
          <div key={i}>
             <p>Character Name: {allChars[i].char_name}</p>
             <p>Character Class: {allChars[i].class}</p>
             <p>Character Lvl: {allChars[i].char_lvl}</p>
             <p>Item Lvl: {allChars[i].item_lvl}</p>
             <p>Roster Lvl: {allChars[i].roster_lvl}</p>
             <p>Engravings: {allChars[i].engravings}</p>
          </div>
       )
    }
    return (
        <div>
            <h1>My Chars</h1>
            {allCharsEl}
        </div>
    );
}

export default AllCharacters;