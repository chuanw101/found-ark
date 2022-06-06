import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

import AllCharacters from '../../AllCharacters';
import AddCharacter from './AddCharacter'
import EditInfo from './EditInfo'


function Profile() {
    const [allChars, setAllChars] = useState('');

    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    const [currentTab, setCurrentTab] = useState('AllCharacters');

    const handleTabSelect = () => {

        if (document.getElementById('allCharTab').checked) {
            setCurrentTab('AllCharacters');
        };
        if (document.getElementById('newCharTab').checked) {
            setCurrentTab('AddCharacter')
        };
        if (document.getElementById('editInfoTab').checked) {
            setCurrentTab('EditInfo')
        };

    };

    const getAllChars = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${tokenData.id}`)
            setAllChars(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllChars();
    }, []);

    getAllChars();

    const renderTab = () => {

        if (currentTab === 'AllCharacters') {
            return <AllCharacters currentTab={currentTab} setCurrentTab={setCurrentTab} allChars={allChars} /> ;
        };
        if (currentTab === 'AddCharacter') {
            return <AddCharacter currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };
        if (currentTab === 'EditInfo') {
            return <EditInfo currentTab={currentTab} setcurrentTab={setCurrentTab} />;
        };
        return <AllCharacters />;

    };


    return (
        <div className="page">
            <h1>Profile</h1>
            <h2>Welcome {tokenData.user_name}</h2>
            <h2>Region: {tokenData.region}</h2>

            <div className="groupsHeader">

                <div className="groupTabs" onClick={handleTabSelect}>

                    <input type="radio" id="allCharTab" name="profileTabs" value="allCharTab" defaultChecked className="groupTab"></input>
                    <label htmlFor="allCharTab" className={currentTab === 'AllCharacters' ? "groupTabLabel activeTab" : "groupTabLabel"}>My Characters</label>

                    <input type="radio" id="newCharTab" name="profileTabs" value="newCharTab" className="groupTab"></input>
                    <label htmlFor="newCharTab" className={currentTab === 'AddCharacter' ? "groupTabLabel activeTab" : "groupTabLabel"}>Add Character</label>

                    <div className="tabDivider"></div>

                    <input type="radio" id="editInfoTab" name="profileTabs" value="editInfoTab" className="groupTab"></input>
                    <label htmlFor="editInfoTab" className={currentTab === 'EditInfo' ? "groupTabLabel activeTab" : "groupTabLabel"}>Edit Profile</label>

                </div>

            </div>

            {renderTab()}

        </div>
    );

};

export default Profile;