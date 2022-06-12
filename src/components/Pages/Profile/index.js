import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

import CharacterDetails from '../../CharacterDetails';
import AddCharacter from './AddCharacter'
import EditCharModal from '../../EditCharModal'
import EditInfo from './EditInfo'


function Profile({ user }) {

    const [allChars, setAllChars] = useState('');
    const [currentTab, setCurrentTab] = useState('MyCharacters');
    const [charModalOpen, setCharModalOpen] = useState(false);
    const [selectedChar, setSelectedChar] = useState();

    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    if (charModalOpen) {
        // Disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // Enable scroll
        document.body.style.overflow = "auto";
    }

    const handleTabSelect = () => {

        if (document.getElementById('allCharTab').checked) {
            setCurrentTab('MyCharacters');
        };

        if (document.getElementById('newCharTab').checked) {
            setCurrentTab('AddCharacter');
        };

        if (document.getElementById('editInfoTab').checked) {
            setCurrentTab('EditInfo');
        };

    };

    const getAllChars = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${tokenData.id}`)
            setAllChars(res.data)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllChars();
    }, []);

    const renderTab = () => {

        // My Characters
        if (currentTab === 'MyCharacters') {

            if (allChars) {

                return (

                    <div className="darkContainer">

                        <h1>My Characters</h1>

                        <div className="allMyCharacters">

                            {allChars.map((char, index) =>
                                <div key={char.id} className="myCharacterCard" style={{animation: `fade-up 0.5s both ${(index / 4) + 1.5}s`}}>
                                    <CharacterDetails char={char} editChar={true} setCharModalOpen={setCharModalOpen} setSelectedChar={setSelectedChar}/>
                                </div>
                            )}

                        </div>

                    </div>

                );

            };

        };

        // Add Character
        if (currentTab === 'AddCharacter') {
            return <AddCharacter currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };

        // Edit Info
        if (currentTab === 'EditInfo') {
            return <EditInfo user={user} currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };

    };


    return (

        <div className="page">

            <div className="tabHeader">

                <h3 className="welcomeMessage">Welcome, {tokenData.user_name}!</h3>

                <div className="tabs" onClick={handleTabSelect}>

                    <input type="radio" id="allCharTab" name="profileTabs" value="allCharTab" defaultChecked className="tab"></input>
                    <label htmlFor="allCharTab" className={currentTab === 'MyCharacters' ? "tabLabel activeTab" : "tabLabel"}>My Characters</label>

                    <input type="radio" id="newCharTab" name="profileTabs" value="newCharTab" className="tab"></input>
                    <label htmlFor="newCharTab" className={currentTab === 'AddCharacter' ? "tabLabel activeTab" : "tabLabel"}>Add Character</label>

                    <div className="tabDivider"></div>

                    <input type="radio" id="editInfoTab" name="profileTabs" value="editInfoTab" className="tab"></input>
                    <label htmlFor="editInfoTab" className={currentTab === 'EditInfo' ? "tabLabel activeTab" : "tabLabel"}>Edit Profile</label>

                </div>

            </div>

            {renderTab()}

            {charModalOpen && <EditCharModal setOpenModal={setCharModalOpen} char={selectedChar} />}

        </div>

    );

};

export default Profile;