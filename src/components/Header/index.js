import React from 'react';
import Navigation from './Navigation';
import './style.css';

function Header({ user, logout, notis }) {

    return (

        <header>

            <div className="siteTitle">

                <img src="/assets/icons/lost-ark-icon.png" alt="lost ark logo" className="lostArkIcon"></img>
                <a href="/"><h1>Found Ark</h1></a>

            </div>

            <Navigation user={user} logout={logout} notis={notis}/>

        </header>

    )

};

export default Header;