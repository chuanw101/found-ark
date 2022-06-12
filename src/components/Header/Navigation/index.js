import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import './style.css';

function Navigation({ user, logout, notis, setNotis }) {

    const [mobileNotiOpen, setMobileNotiOpen] = useState(true);

    let count = 0;
    for (const n of notis) {
        if (!n.read) {
            count++
        }
    }

    const handleNotiOpen = () => {

        if (window.innerWidth > 768) {
            return;
        } else if (mobileNotiOpen) {
            setMobileNotiOpen(false);
            document.body.style.overflow = "auto";
        } else if (!mobileNotiOpen) {
            setMobileNotiOpen(true);
            document.body.style.overflow = "hidden";
        }

    }

    useEffect(() => {
        handleNotiOpen();
    }, [window.innerWidth]);

    return (

        <ul className="navigation">

            <li className="navItem">
                <Link to="/">Groups</Link>
            </li>

            {user?.logged_in ? (
                <>
                    <li id="notIcon" className="navItem" onClick={handleNotiOpen}>
                        <div className="notificationContainer">
                            <img src="/assets/icons/notification-bell.png" alt="notifications" className="notificationIcon"></img>
                            {count && <span className="notificationAlert"></span>}
                        </div>
                        {mobileNotiOpen && <Notifications notis={notis} setNotis={setNotis} handleNotiOpen={handleNotiOpen} />}
                    </li>

                    <li className="navItem">
                        <Link to="profile">Profile</Link>
                    </li>
                    <li className="navItem" onClick={logout}>
                        Log Out
                    </li>
                </>
            ) : (
                <>
                    <li className="navItem">
                        <Link to="signup">Create Account</Link>
                    </li>

                    <li className="navItem">
                        <Link to="login">Login</Link>
                    </li>
                </>
            )}
        </ul>

    );

};

export default Navigation;