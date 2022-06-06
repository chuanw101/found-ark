import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function MyGroups({ user }) {
    const [myChars, setMyChars] = useState([]);

    //get my groups
    const getMyChars = async () => {

        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/users/${user?.id}`);
            setMyChars(res.data.characters);
            console.log(res.data.characters)
        } catch (err) {
            console.log(err);
        };

    };

    useEffect(() => {
        getMyChars();
    }, []);

    console.log(myChars)

    return (

        <div className="page">

            <h1>My Groups</h1>

        </div>

    );

};

export default MyGroups;