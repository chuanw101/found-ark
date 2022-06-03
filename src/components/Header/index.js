import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header() {

    return (

        <header>

            <div className="siteTitle">

                <img src="/assets/icons/lost-ark-icon.png" alt="lost ark logo" className="lostArkIcon"></img>
                <h1 className="">Found Ark</h1>

            </div>

            <Navigation />

        </header>

    );

};

export default Header;