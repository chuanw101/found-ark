import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

import CharacterDetails from '../CharacterDetails';

function Profile() {
   const [charName, setCharName] = useState('');
   const [className, setClassName] = useState('');
   const [iLvl, setILvl] = useState('');
   const [rosterLvl, setRosterLvl] = useState('');
   const [charLvl, setCharLvl] = useState('');
   const [engravings, setEngravings] = useState('');
   const [newChar, setNewChar] = useState('');

   const token = localStorage.getItem('foundArkJwt');
   const tokenData = jwtDecode(token);

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
      if (newChar) {
         console.log(newChar)
         return <CharacterDetails advCharData={newChar} />;
      }
   }

   const pullCharInfo = async(e) => {
      e.preventDefault();
      try {
         const res = await axios.get(`https://lostark-lookup.herokuapp.com/api/query?pcName=${charName}`)
         if(res.data?.length) {
            const charData = res.data[0];
            setClassName(charData.pcClassName);
            setILvl(charData.maxItemLevel);
            setRosterLvl(charData.expeditionLvl);
            setCharLvl(charData.pcLevel);

            setNewChar(JSON.parse(charData.jsonData));
         } else {
            setNewChar('');
         }
      } catch (err) {
         setNewChar('');
         console.log(err);
      }
   }

   return (
      <div className="page">
         <h1>Profile</h1>
         <h2>Welcome {tokenData.user_name}</h2>
         <h2>Region: {tokenData.region}</h2>

         <div className="charContainer">
            {/* Display char info */}
         </div>

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

               <button type="submit">Add New Character</button>
            </div>
         </form>
         {displayCharInfo()}
      </div>
   );
   
};

export default Profile;