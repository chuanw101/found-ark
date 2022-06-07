import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import './style.css';

function MyGroups({ user, activeTags }) {
    const [myChars, setMyChars] = useState([]);

    //get my groups
    const getMyChars = async () => {

        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/users/${user?.id}`);
            if (res?.data?.characters) {
                for (const chars of res.data.characters) {
                    chars.joined = filterGroups(chars.joined);
                }
            }
            console.log(res.data.characters)
            setMyChars(res.data.characters);
        } catch (err) {
            console.log(err);
        };

    };
    
    const filterGroups = (groupsToFilter) => {
        if(activeTags.length) {
            let newGroups = [...groupsToFilter];
            for (const group of newGroups) {
                let foundCount = 0;
                for(const tag of activeTags) {
                    if (group.tag.some(t=>t.tag_name===tag)) {
                        foundCount++;
                    }
                }
                group.show = (foundCount === activeTags.length);
            }
            return newGroups;
        } else {
            let newGroups = [...groupsToFilter];
            for (const group of newGroups) {
                group.show = true;
            }
            return newGroups;
        }
    }

    useEffect(() => {
        getMyChars();
    }, []);

    useEffect(()=> {
        let temp = [...myChars];
        for (const chars of temp) {
            chars.joined = filterGroups(chars.joined);
        }
        setMyChars(temp);
    }, [activeTags])

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

    const formatTime = (time) => {
        if(!time) {
            return
        }
        return(moment(time).format('dddd h:mm a'))
    }

    return (

        <div className="darkContainer">
            <h1>My Groups</h1>
            {myChars.map(char => {
                return (
                    <React.Fragment key={char.id}>
                        <h2>{char.char_name}'s Groups</h2>
                        {char?.joined?.length ? (<></>) : (<><h3>none joined</h3></>)}
                        {char?.joined?.filter(group=>group.show).map(group => {
                            return (

                                <div key={group.id} id={group.id} className={
                                    group.id % 4 === 0 ? 'groupPreview bgTree' :
                                        group.id % 3 === 0 ? 'groupPreview bgGiant' :
                                            group.id % 2 === 0 ? 'groupPreview bgCity' : 'groupPreview bgSky'
                                } onClick={handleGroupClick}>

                                    <div>
                                        <h2>{group.group_name}</h2>
                                        <p>{group.description}</p>
                                        <p>{formatTime(group.time)}</p>
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
                    </React.Fragment>
                )
            })}
        </div>

    );

};

export default MyGroups;