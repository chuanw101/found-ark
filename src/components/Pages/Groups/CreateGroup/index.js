import React, { useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TimezoneSelect from 'react-timezone-select'
import './style.css';


function CreateGroup() {

    // form data
    const [selectedTimezone, setSelectedTimezone] = useState({});
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [discord, setDiscord] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [newTag, setTag] = useState("");
    const [tags, addNewTag] = useState([]);

    // define token
    const token = localStorage.getItem('foundArkJwt');
    const tokenData = jwtDecode(token);

    // validate tag input
    const tagReg = /^[+-_a-zA-Z0-9]{2,}$/;

    // add tag to tags array
    const addTag = () => {
        if (newTag === '') {
            return;
        } else if (tags.includes(newTag)) {
            return;
        } else if (!tagReg.test(newTag)) {
            return;
        } else {
            addNewTag([...tags, newTag]);
            setTag('');
        };
    };

    // remove tag from tags array
    const removeTag = (e) => {
        console.log(e.target.innerText)
        const newTags = tags.filter(tag => tag !== e.target.innerText);
        addNewTag(newTags);
    };

    // listen for enter key press when adding tags
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            addTag();
        };
    };

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'groupName') {
            setGroupName(value);
        };
        if (name === 'description') {
            setDescription(value);
        };
        if (name === 'discord') {
            setDiscord(value);
        };
        if (name === 'dayofweek') {
            setDay(value);
        };
        if (name === 'time') {
            setTime(value);
        };
        if (name === 'tags') {
            setTag(value);
        };
    };

    // handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const groupRes = await axios.post('https://found-ark-backend.herokuapp.com/api/groups', {
                creator_id: tokenData.id,
                group_name: groupName,
                description: description,
                discord: discord,
                day: day,
                time: time
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            const groupData = groupRes.data[0];

            if (tags?.length) {
                for (let i = 0; i < tags.length; i++) {
                    const tagRes = await axios.post(`https://found-ark-backend.herokuapp.com/api/groups/${groupData.id}/tag/${tags[i]}`);

                    console.log(tagRes);
                }
            };

            setGroupName('');
            setDescription('');
            setDiscord('');
            setDay('');
            setTime('');
            setTag('');

        } catch (err) {
            if (err?.response?.data?.msg === 'an error occured') {
                alert("An error occured")
            }
            console.log(err);
        };
    };


    return (

        <div className="createGroupContainer">

            <h1>Create New Group</h1>

            <form method="post" className="createGroup">


                <label htmlFor="groupName"><b>Group Name</b></label>
                <input type="text" placeholder="Enter Group Name" name="groupName" onChange={handleInputChange} required />

                <label htmlFor="description"><b>Description</b></label>
                <input type="text" placeholder="Description" name="description" onChange={handleInputChange} required />

                <label htmlFor="discord"><b>Discord</b></label>
                <input type="url" placeholder="https://discord.com" name="discord" pattern="https://.*" onChange={handleInputChange} required />

                <label htmlFor="dayofweek"><b>Day</b></label>
                <select name="dayofweek" required onChange={handleInputChange}>
                    <option value="" defaultValue disabled>Select...</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>

                <label htmlFor="timezone"><b>Time Zone</b></label>
                <div name="timezone" className="select-wrapper">
                    <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
                </div>

                <label htmlFor="time"><b>Time</b></label>
                <input type="time" placeholder="Time" name="time" onChange={handleInputChange} required />

                <div className="addTags">

                    <label htmlFor="tags">Group Tags</label>

                    <div className="tagInput">

                        <input type="search" id="tags" name="tags" pattern='[+-_a-zA-Z0-9]{2,}' value={newTag} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                        <button onClick={addTag} id="tagBtn" type="button">Add Tag</button>
                        <span className="validity"></span>

                    </div>

                    <p className={newTag === "" || newTag === [] || !tagReg.test(newTag) ? 'visible' : 'hidden'}>Tags can only include letters, numbers, and these special characters: + - _</p>

                    <div className="chosenTags">
                        {tags.map((tag, index) =>
                            <p key={index} onClick={removeTag}>{tag}</p>)}
                    </div>

                </div>

                <button type="submit" id="createGroupBtn" onClick={handleFormSubmit}>Create Group</button>

            </form>

        </div>

    );

};

export default CreateGroup;