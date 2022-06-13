import React from 'react';
import CharacterDetails from '../CharacterDetails';

function AllCharacters({ allChars }) {
    let allCharsEl = []
    for (let i = 0; i < allChars.length; i++) {
        allCharsEl.push(
            <div key={i}>
                <h1>Char Info:</h1>
                <p>Character Name: {allChars[i].char_name}</p>
                <p>Character Class: {allChars[i].class}</p>
                <p>Character Lvl: {allChars[i].char_lvl}</p>
                <p>Item Lvl: {allChars[i].item_lvl}</p>
                <p>Roster Lvl: {allChars[i].roster_lvl}</p>
                <p>Engravings: {allChars[i].engravings}</p>
                <CharacterDetails jsonData={allChars[i].json_data} />
                <hr></hr>
            </div>
        )
    }
    return (
        <div>
            <h1>My Chars</h1>
            {allChars.map}
            {allCharsEl}
        </div>
    );
}

export default AllCharacters;