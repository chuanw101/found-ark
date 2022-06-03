import React, { useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

function AllGroups() {

    const [allGroups, setAllGroups] = useState([]);

    const getAllGroups = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups`);
            setAllGroups(res.data);
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getAllGroups();
    }, []);

    console.log(allGroups)

    return (

        <div className="page">

            <h1>All Groups</h1>

            {allGroups.map((group) => {

                return (

                    <div key={group.id} id={group.id} className="group">

                    <h2>{group.group_name}</h2>
                    <p>{group.description}</p>

                    </div>
                    
                )

            })}


        </div>

    );

};

export default AllGroups;