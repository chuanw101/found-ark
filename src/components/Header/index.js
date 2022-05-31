import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header({ currentPage, setCurrentPage }) {

   return (

      <header>

         <div className="siteTitle">

            <img src="/assets/icons/lost-ark-icon.png" alt="lost ark logo" className="lostArkIcon"></img>
            <h1>Found Ark</h1>

         </div>

         <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage}/>

      </header>
      
   );
   
};

export default Header;