import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css';

function MyGroups({ user, activeTags }) {
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

    let navigate = useNavigate();

    const handleGroupClick = (e) => {
        // navigate('/');
        let id;
        let temp = e.target;
        while (!id) {
            id = temp.id;
            temp = temp.parentElement;
        }
        navigate(`/group/${id}`)
    }

    return (

        <div className="darkContainer">
            <h1>My Groups</h1>
            {myChars.map(char => {
                return (
                    <div key={char.id}>
                        <h2>{char.char_name}'s Groups</h2>
                        {char?.joined?.map(group => {
                            return (

                                <div key={group.id} id={group.id} className={
                                    group.id % 4 === 0 ? 'groupPreview bgTree' :
                                        group.id % 3 === 0 ? 'groupPreview bgGiant' :
                                            group.id % 2 === 0 ? 'groupPreview bgCity' : 'groupPreview bgSky'
                                } onClick={handleGroupClick}>

                                    <div>
                                        <h2>{group.group_name}</h2>
                                        <p>{group.description}</p>
                                        <p>Members:
                                            {group.member_char?.map((character) => {
                                                return (<span key={character.id}>{character.groupmember.is_owner ? (<>🟡</>) : (<></>)}{character.char_name}({character.item_lvl}) </span>)
                                            })}
                                        </p>
                                        <p>Tags:
                                            {group.tag?.map((tag) => {
                                                return (<span key={tag.id}> {tag.tag_name}</span>)
                                            })}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )
            })}
        </div>

    );

};

export default MyGroups;