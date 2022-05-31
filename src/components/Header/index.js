import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header({ currentPage, setCurrentPage }) {

   return (

      <header>

         <div className="site-title">
            <h1>Found Ark</h1>
         </div>

         <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage}/>

      </header>
      
   );
   
};

export default Header;