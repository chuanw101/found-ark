import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

import CharacterDetails from '../../CharacterDetails';
import AllCharacters from '../../AllCharacters';

function Profile() {
   const [charName, setCharName] = useState('');
   const [className, setClassName] = useState('');
   const [iLvl, setILvl] = useState('');
   const [rosterLvl, setRosterLvl] = useState('');
   const [charLvl, setCharLvl] = useState('');
   const [engravings, setEngravings] = useState('');
   const [jsonData, setJsonData] = useState('');
   const [allChars, setAllChars] = useState('');

   const token = localStorage.getItem('foundArkJwt');
   const tokenData = jwtDecode(token);

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

   //getAllChars();
   console.log(allChars)
   const displayAllChars = () => {
      if (allChars) {
         return <AllCharacters allChars={allChars} />;
      }
   }

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
      }
   };

   const displayCharInfo = () => {
      if (jsonData) {
         return <CharacterDetails jsonData={jsonData} />;
      }
   }

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
         } else {
            setCharName('');
            setClassName('');
            setILvl('');
            setRosterLvl('');
            setCharLvl('');
            setEngravings('');
            setJsonData('');
         }
      } catch (err) {
         setCharName('');
         setClassName('');
         setILvl('');
         setRosterLvl('');
         setCharLvl('');
         setEngravings('');
         setJsonData('');
         console.log(err);
      }
   }

   const addCharacter = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post('https://found-ark-backend.herokuapp.com/api/characters', {
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
         getAllChars();
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <div className="page">
         <h1>Profile</h1>
         <h2>Welcome {tokenData.user_name}</h2>
         <h2>Region: {tokenData.region}</h2>

         {displayAllChars()}

         <form method="post">
            <div className="container">
               <label htmlFor="charName"><b>Character Name</b></label>
               <input type="text" placeholder="Character Name" name="charName" value={charName} onChange={handleInputChange} required />

               <button onClick={pullCharInfo}>Auto Fill</button>

               <label htmlFor="className"><b>Class</b></label>
               <input type="text" placeholder="Enter Class" name="className" value={className} onChange={handleInputChange} required />

               <label htmlFor="iLvl"><b>Item Level</b></label>
               <input type="number" placeholder="Enter Item Level" name="iLvl" value={iLvl} onChange={handleInputChange} required />

               <label htmlFor="rosterLvl"><b>Roster Level</b></label>
               <input type="number" placeholder="Enter Roster Level" name="rosterLvl" value={rosterLvl} onChange={handleInputChange} required />

               <label htmlFor="charLvl"><b>Character Level</b></label>
               <input type="number" placeholder="Enter Character Level" name="charLvl" value={charLvl} onChange={handleInputChange} required />

               <label htmlFor="engravings"><b>Engravings</b></label>
               <input type="text" placeholder="Enter Engravings" name="engravings" value={engravings} onChange={handleInputChange} required />

               <button onClick={addCharacter}>Add New Character</button>
            </div>
         </form>
         {displayCharInfo()}
      </div>
   );

};

export default Profile;