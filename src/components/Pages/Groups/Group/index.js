import React, { useState, useEffect } from 'react';
import './style.css';

import axios from 'axios'
import jwtDecode from 'jwt-decode';

function Group({ groupId }) {
    const [group, setGroup] = useState(null);

    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    // get all groups
    const getGroup = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups/${groupId}`);
            setGroup(res.data);
            console.log(res.data);

        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        getGroup();
    }, []);

    let membersEl = [];
    if (group){
        console.log(group.member)
        for (let i = 0; i < group?.member?.length; i++) {
            console.log(group.member[i])
            membersEl.push(
                <div key={i}>
                    <h2>{group.member[i].user_name}</h2>
                </div>
            )
        }
        // for(const [i, member] of group.member) {
        //     membersEl.push(
        //         <div key={i}>
        //             <h2>{member.user_name}</h2>
        //         </div>
        //     )
        // }
    }

    return (

        <div className="page">
            <h1>{group?.group_name}</h1>
            <h2>{group?.description}</h2>
            <h2>{group?.region}</h2>
            <h2>Created by {group?.creator.user_name} </h2>
            <br></br>
            <h1>Members:</h1>
            {membersEl}
        </div>

    );

};

export default Group;