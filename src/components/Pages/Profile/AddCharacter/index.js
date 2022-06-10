import React, { useState } from 'react';
import axios from 'axios';
import CharacterDetails from '../../../CharacterDetails';
import './style.css';


function AddCharacter() {
    const [charName, setCharName] = useState('');
    const [className, setClassName] = useState('');
    const [iLvl, setILvl] = useState('');
    const [rosterLvl, setRosterLvl] = useState('');
    const [charLvl, setCharLvl] = useState('');
    const [engravings, setEngravings] = useState('');
    const [jsonData, setJsonData] = useState('');
    const [formStatus, setFormStatus] = useState('hidden');
    const [buttonStatus, setButtonStatus] = useState('hidden');
    const [searchStatus, setSearchStatus] = useState('');

    const token = localStorage.getItem('foundArkJwt');

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;
        // set value based on name
        if (name === 'charName') {
            setCharName(value);
        } else if (name === 'className') {
            setClassName(value);
        } else if (name === 'iLvl') {
            setILvl(value);
        } else if (name === 'rosterLvl') {
            setRosterLvl(value);
        } else if (name === 'charLvl') {
            setCharLvl(value);
        } else if (name === 'engravings') {
            setEngravings(value);
        };

    };

    const pullCharInfo = async (e) => {

        e.preventDefault();

        try {
            const res = await axios.get(`https://lostark-lookup.herokuapp.com/api/query?pcName=${charName}`)
            if (res.data?.length) {
                const charData = res.data[0];
                setClassName(charData.pcClassName);
                setILvl(charData.maxItemLevel);
                setRosterLvl(charData.expeditionLvl);
                setCharLvl(charData.pcLevel);
                setEngravings('');
                setJsonData(charData.jsonData);
                setButtonStatus('');
                setSearchStatus('searched');
            } else {
                setClassName('berserker');
                setILvl('');
                setRosterLvl('');
                setCharLvl('');
                setEngravings('');
                setJsonData('');
                setFormStatus('');
                setButtonStatus('');
                setSearchStatus('searched');
            }
        } catch (err) {
            setClassName('berserker');
            setILvl('');
            setRosterLvl('');
            setCharLvl('');
            setEngravings('');
            setJsonData('');
            setFormStatus('');
            setButtonStatus('');
            setSearchStatus('searched');
            console.log(err);
        }
    };

    const addCharacter = async (e) => {

        e.preventDefault();

        try {
            await axios.post('https://found-ark-backend.herokuapp.com/api/characters', {
                char_name: charName,
                class: className,
                item_lvl: iLvl,
                roster_lvl: rosterLvl,
                char_lvl: charLvl,
                engravings: engravings,
                json_data: jsonData,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            setCharName('');
            setClassName('');
            setILvl('');
            setRosterLvl('');
            setCharLvl('');
            setEngravings('');
            setJsonData('');
            window.location.reload(true);
        } catch (err) {
            console.log(err);
        };

    };

    const charData = {
        char_name: charName,
        class: className,
        item_lvl: iLvl,
        roster_lvl: rosterLvl,
        char_lvl: charLvl,
        engravings: engravings,
        json_data: jsonData,
    }

    return (

        <div className="darkContainerWrapped">

            <h1>Add Character</h1>

            <div className="addCharacterSection">

                <div className="addCharacterForm">

                    <form method="post" className="autoFillForm">

                        <label htmlFor="charName"><b>Character Name</b></label>
                        <input type="text" placeholder="Character Name" name="charName" value={charName} onChange={handleInputChange} required />

                        <button className="submitBtn" onClick={pullCharInfo}>Search</button>

                    </form>

                    <form method="post" className={"manualForm " + buttonStatus}>

                        <div className={formStatus + " charSpecsCont"}>

                            <label htmlFor="className"><b>Class</b></label>
                            <select name="className" onChange={handleInputChange} required>
                                <option value="berserker">berserker</option>
                                <option value="paladin">paladin</option>
                                <option value="gunlancer">gunlancer</option>
                                <option value="destroyer">destroyer</option>
                                <option value="striker">striker</option>
                                <option value="wardancer">wardancer</option>
                                <option value="scrapper">scrapper</option>
                                <option value="soulfist">soulfist</option>
                                <option value="glaivier">glaivier</option>
                                <option value="gunslinger">gunslinger</option>
                                <option value="artillerist">artillerist</option>
                                <option value="deadeye">deadeye</option>
                                <option value="sharpshooter">sharpshooter</option>
                                <option value="bard">bard</option>
                                <option value="sorceress">sorceress</option>
                                <option value="shadowhunter">shadowhunter</option>
                                <option value="deathblade">deathblade</option>
                            </select>

                            <label className="userInput" htmlFor="charLvl"><b>Character Level</b></label>
                            <input type="number" placeholder="Enter Character Level" name="charLvl" value={charLvl} onChange={handleInputChange} required />

                            <label className="userInput" htmlFor="iLvl"><b>Item Level</b></label>
                            <input type="number" placeholder="Enter Item Level" name="iLvl" value={iLvl} onChange={handleInputChange} required />

                            <label className="userInput" htmlFor="rosterLvl"><b>Roster Level</b></label>
                            <input type="number" placeholder="Enter Roster Level" name="rosterLvl" value={rosterLvl} onChange={handleInputChange} required />

                        </div>

                        <label className={!formStatus && " userInput"} htmlFor="engravings"><b>Engravings</b></label>
                        <input type="text" placeholder="Enter Engravings" name="engravings" value={engravings} onChange={handleInputChange} required />

                        <button onClick={addCharacter} className={buttonStatus + " submitBtn"}>Add Character</button>

                    </form>

                </div>

                <div className="charDisplay">

                    {searchStatus && !jsonData ?
                        <div className="leaderboardLink">
                            <h3>Import Character from Lost Ark Meta</h3>
                            <p>Follow the instructions below:</p>
                            <a href={`https://lostark.meta-game.gg/armory?character=${charName}`} target="_blank" rel="noreferrer">Link to Instructions</a>
                            <p className="orDivider">OR</p>
                            <p>Enter your character information manually.</p>
                        </div>
                        : ''
                    }

                    {searchStatus ? <div className="characterPreview"> <CharacterDetails char={charData} /> </div> : ''}

                </div>


            </div>

        </div>
    )
}

export default AddCharacter;