import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header({ user, logout }) {

    return (

        <header>

            <div className="siteTitle">

                <img src="/assets/icons/lost-ark-icon.png" alt="lost ark logo" className="lostArkIcon"></img>
                <h1 className="">Found Ark</h1>

            </div>

            <Navigation user={user} logout={logout} />

        </header>

    )

};

export default Header;