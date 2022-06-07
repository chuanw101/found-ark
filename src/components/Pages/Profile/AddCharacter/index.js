import React, { useState } from 'react';
import axios from 'axios';
import CharacterDetails from '../../../CharacterDetails';
import './style.css';


function AddCharacter({ setCurrentTab }) {
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
                setCharName('');
                setClassName('');
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
            setCharName('');
            setClassName('');
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
            setCurrentTab('MyCharacters');
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

        <div className="darkContainer">

            <h1>Add Character</h1>

            <div className="addCharacterSection">

                <div className="addCharacterForm">

                    <form method="post" className="autoFillForm">

                        <label htmlFor="charName"><b>Character Name</b></label>
                        <input type="text" placeholder="Character Name" name="charName" value={charName} onChange={handleInputChange} required />

                        <button onClick={pullCharInfo}>Search</button>

                    </form>

                    <form method="post" className={"manualForm " + buttonStatus}>

                        <div className={formStatus}>

                            <label htmlFor="className"><b>Class</b></label>
                            <input type="text" placeholder="Enter Class" name="className" value={className} onChange={handleInputChange} required />

                            <label htmlFor="iLvl"><b>Item Level</b></label>
                            <input type="number" placeholder="Enter Item Level" name="iLvl" value={iLvl} onChange={handleInputChange} required />

                            <label htmlFor="rosterLvl"><b>Roster Level</b></label>
                            <input type="number" placeholder="Enter Roster Level" name="rosterLvl" value={rosterLvl} onChange={handleInputChange} required />

                            <label htmlFor="charLvl"><b>Character Level</b></label>
                            <input type="number" placeholder="Enter Character Level" name="charLvl" value={charLvl} onChange={handleInputChange} required />

                        </div>

                        <label htmlFor="engravings"><b>Engravings</b></label>
                        <input type="text" placeholder="Enter Engravings" name="engravings" value={engravings} onChange={handleInputChange} required />

                        <button onClick={addCharacter} className={buttonStatus}>Add Character</button>

                    </form>

                </div>

                {searchStatus ? <div className="characterPreview"> <CharacterDetails char={charData} /> </div> : ''}


            </div>

        </div>
    )
}

export default AddCharacter;