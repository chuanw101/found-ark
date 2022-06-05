import React, { useState, useEffect } from 'react';
import './style.css';

import axios from 'axios'

import CharacterDetails from '../../../CharacterDetails';

function Group({ user, groupId }) {
    const [group, setGroup] = useState(null);

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

    if(user?.logged_in) {
        if(group.creator.owner_id === user.id){
            console.log("this is mine")
            // user is creator of this group, add buttons for update/delete
        } else if (group.member_char.some(char => {
            if(char.owner_id === user.id) {
                return true;
            }
            return false;
        })){
            console.log("I'm a member")
            // user is a member, display info only for chars
        }
    }

    let membersEl = [];
    if (group){
        for (let i = 0; i < group?.member_char?.length; i++) {
            membersEl.push(
                <div key={i}>
                    <h2>{group.member_char[i].char_name}</h2>
                    <CharacterDetails jsonData={group.member_char[i].json_data}/>
                </div>
            )
        }
    }

    return (

        <div className="page">
            <h1>{group?.group_name}</h1>
            <h2>{group?.description}</h2>
            <h2>{group?.region}</h2>
            <h2>Created by {group?.creator.char_name} ({group?.creator.owner.user_name}) </h2>
            <br></br>
            <h1>Members:</h1>
            {membersEl}
        </div>

    );

};

export default Group;