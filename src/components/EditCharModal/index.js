import React, { useState } from "react";
import axios from 'axios';
import CharacterDetails from '../CharacterDetails';
import "../../styles/modals.css";

function EditCharModal({ setOpenModal, char }) {

    const [charName, setCharName] = useState(char.char_name);
    const [className, setClassName] = useState(char.class);
    const [iLvl, setILvl] = useState(char.item_lvl);
    const [rosterLvl, setRosterLvl] = useState(char.roster_lvl);
    const [charLvl, setCharLvl] = useState(char.char_lvl);
    const [engravings, setEngravings] = useState(char.engravings);
    const [jsonData, setJsonData] = useState(char.json_data);
    const [searchStatus, setSearchStatus] = useState(false);

    const token = localStorage.getItem('foundArkJwt');

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
                setILvl(Math.floor(charData.maxItemLevel));
                setRosterLvl(charData.expeditionLvl);
                setCharLvl(charData.pcLevel);
                setJsonData(charData.jsonData);
                setSearchStatus(true);
            } else {
                setSearchStatus(true);
            }
        } catch (err) {
            setSearchStatus(true);
            console.log(err);
        }
    };

    const updateCharacter = async (e) => {

        e.preventDefault();

        try {
            await axios.put(`https://found-ark-backend.herokuapp.com/api/characters/${char.id}`, {
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

        <div className="modalBackground" onClick={() => setOpenModal(false)}>

            <div className="modalContainer mobileExpand" onClick={e => e.stopPropagation()}>

                <div className="title">
                    <h1>Edit Character</h1>
                </div>
                <div className="editCharacterSection">

                    <div className="editCharacterForm">

                        <form method="post" className="autoFillForm">

                            <label htmlFor="charName"><b>Character Name</b></label>
                            <input type="text" placeholder="Character Name" name="charName" value={charName} onChange={handleInputChange} required />

                            <button onClick={pullCharInfo} className="submitBtn">Search</button>

                        </form>

                        <form method="post" className="manualForm">

                            <div className="charEditSpecs">

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

                                <label htmlFor="charLvl" className="userInput"><b>Character Level</b></label>
                                <input type="number" placeholder="Enter Character Level" name="charLvl" value={charLvl} onChange={handleInputChange} required />

                                <label htmlFor="iLvl" className="userInput"><b>Item Level</b></label>
                                <input type="number" placeholder="Enter Item Level" name="iLvl" value={iLvl} onChange={handleInputChange} required />

                                <label htmlFor="rosterLvl" className="userInput"><b>Roster Level</b></label>
                                <input type="number" placeholder="Enter Roster Level" name="rosterLvl" value={rosterLvl} onChange={handleInputChange} required />

                            </div>

                            <label htmlFor="engravings" className="userInput"><b>Engravings</b></label>
                            <input type="text" placeholder="Enter Engravings" name="engravings" value={engravings} onChange={handleInputChange} required />

                            <div className="editCharFooter">
                                <button onClick={() => setOpenModal(false)} className="submitBtn">Cancel</button>
                                <button onClick={updateCharacter} className="submitBtn">Submit</button>
                            </div>

                        </form>

                    </div>

                    <div className="charDisplay">

                        {!jsonData && searchStatus &&
                            <div className="leaderboardLink">
                                <a href={`https://lostark.meta-game.gg/armory?character=${charName}`} target="_blank" rel="noreferrer">
                                    <p>Follow these instructions to</p>
                                    <h3>Import Character from {window.innerWidth < 480 && <br></br>} Lost Ark Meta</h3>
                                </a>
                                <p className="orDivider">OR</p>
                                <p>Enter your character information manually.</p>
                            </div>
                        }

                        <div className="characterPreview"> <CharacterDetails char={charData} /> </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default EditCharModal;