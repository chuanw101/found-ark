import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function MyGroups({ user }) {
    const [myGroups, setMyGroups] = useState([]);

    const token = localStorage.getItem('foundArkJwt');

    //get my groups
    const getMyGroups = async () => {

        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            setMyGroups(res.data);
            console.log(res.data)
        } catch (err) {
            console.log(err);
        };

    };

    useEffect(() => {
        //getMyGroups();
    }, []);

    return (

        <div className="page">

            <h1>My Groups</h1>

        </div>

    );

};

export default MyGroups;