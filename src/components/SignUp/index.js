import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function SignUp() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [region, setRegion] = useState('');
   const [introduction, setIntroduction] = useState('');

   const handleInputChange = (e) => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = e.target;
      // set value based on name
      if (name === 'username') {
         setUsername(value);
      } else if (name === 'password') {
         setPassword(value);
      } else if (name === 'region') {
         setRegion(value);
      } else if (name === 'introduction') {
         setIntroduction(value);
      }
   };

   const handleFormSubmit = async (e) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      e.preventDefault();
      try {
         alert(username)
         const res = await axios.post('https://found-ark-backend.herokuapp.com/api/users/signup', {
            user_name: username,
            password: password,
            region: region,
            introduction: introduction,
         })
         localStorage.setItem('foundArkJwt', res?.data?.token);
      } catch (err) {
         if (err?.response?.data?.msg == 'User name taken') {
            alert("user name taken")
         }
         console.log(err);
      }
   };


   return (

      <div className="page">

         <h1>Sign Up</h1>
         <form method="post">
            <div className="container">
               <label htmlFor="username"><b>Username</b></label>
               <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleInputChange} required />

               <label htmlFor="password"><b>Password</b></label>
               <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} required />

               <label htmlFor="region"><b>Region</b></label>
               <input type="text" placeholder="Enter Region" name="region" value={region} onChange={handleInputChange} required />

               <label htmlFor="introduction"><b>Introduction</b></label>
               <input type="text" placeholder="Hi~" name="introduction" value={introduction} onChange={handleInputChange} required />

               <button type="submit" onClick={handleFormSubmit}>Sign Up</button>
            </div>
         </form>

      </div>

   );

};

export default SignUp;