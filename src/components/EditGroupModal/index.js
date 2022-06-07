import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

function EditGroupModal({ setOpenModal, setGroup, group }) {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [day, setDay] = useState("2022-06-06");
    const [timeZone, setTimeZone] = useState("(GMT+00:00) Greenwich Mean Time");
    const [time, setTime] = useState("");
    const [newTag, setTag] = useState("");
    const [tags, addNewTag] = useState([]);

    // time zone array
    const timeZones = [
        '(GMT+00:00) Greenwich Mean Time',
        '(GMT+01:00) European Central Time',
        '(GMT+02:00) Eastern European Time',
        '(GMT+03:00) Eastern African Time',
        '(GMT+03:30) Middle East Time',
        '(GMT+04:00) Near East Time',
        '(GMT+05:00) Pakistan Lahore Time',
        '(GMT+05:30) India Standard Time',
        '(GMT+06:00) Bangladesh Standard Time',
        '(GMT+07:00) Vietnam Standard Time',
        '(GMT+08:00) China Taiwan Time',
        '(GMT+09:00) Japan Standard Time',
        '(GMT+09:30) Australia Central Time',
        '(GMT+10:00) Australia Eastern Time',
        '(GMT+11:00) Solomon Standard Time',
        '(GMT+12:00) New Zealand Standard Time',
        '(GMT-11:00) Midway Islands Time',
        '(GMT-10:00) Hawaii Standard Time',
        '(GMT-09:00) Alaska Standard Time',
        '(GMT-08:00) Pacific Standard Time',
        '(GMT-07:00) Phoenix Standard Time',
        '(GMT-07:00) Mountain Standard Time',
        '(GMT-06:00) Central Standard Time',
        '(GMT-05:00) Eastern Standard Time',
        '(GMT-05:00) Indiana Eastern Standard Time',
        '(GMT-04:00) Puerto Rico and US Virgin Islands Time',
        '(GMT-03:30) Canada Newfoundland Time',
        '(GMT-03:00) Argentina Standard Time',
        '(GMT-03:00) Brazil Eastern Time',
        '(GMT-01:00) Central African Time'
    ]

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
        if (name === 'dayofweek') {
            setDay(value);
        };
        if (name === 'timezone') {
            setTimeZone(value);
        };
        if (name === 'time') {
            setTime(value);
        };
        if (name === 'tags') {
            setTag(value);
        };
    };

    const submitNewGroupInfo = async () => {
        try {
            let timeInfo;
            if (time) {
                timeInfo = new Date(`${day}T${time}:00.000${timeZone.substring(4, 10)}`);
            }
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/groups/${group.id}`, {
                group_name: groupName,
                description: description,
                tags: tags,
                time: timeInfo
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            console.log(res);
            group.group_name = groupName;
            group.description = description;
            group.tags = tags;
            group.time = timeInfo;
            setGroup(group);
            setGroupName('');
            setDescription('');
            setDay('2022-06-06');
            setTime('');
            setTimeZone('(GMT+00:00) Greenwich Mean Time');
            setTag('');
            setOpenModal(false);
        } catch (err) {
            if (err?.response?.data?.msg === 'an error occured') {
                alert("An error occured")
            }
            console.log(err);
        };
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Edit Group Information</h1>
                </div>

                <div className="body">
                    <form method="post" className="createGroup">


                        <label htmlFor="groupName">Group Name</label>
                        <input type="text" placeholder="Enter Group Name" name="groupName" onChange={handleInputChange} required />

                        <label htmlFor="description">Description</label>
                        <input type="text" placeholder="Description" name="description" onChange={handleInputChange} required />
                        <label htmlFor="dayofweek">Day</label>
                        <select name="dayofweek" required onChange={handleInputChange}>
                            <option value="2022-06-06">Monday</option>
                            <option value="2022-06-07">Tuesday</option>
                            <option value="2022-06-08">Wednesday</option>
                            <option value="2022-06-09">Thursday</option>
                            <option value="2022-06-10">Friday</option>
                            <option value="2022-06-11">Saturday</option>
                            <option value="2022-06-12">Sunday</option>
                        </select>

                        <label htmlFor="timezone">Time Zone</label>
                        <select name="timezone" required onChange={handleInputChange}>

                            {timeZones.map((zone, index) => {
                                return (
                                    <option key={index} value={zone}>{zone}</option>
                                )
                            })}

                        </select>

                        <label htmlFor="time">Time</label>
                        <input type="time" placeholder="Time" name="time" onChange={handleInputChange} required />

                        <div className="addTags">

                            <label htmlFor="tags">Group Tags</label>

                            <div className="tagInput">

                                <input type="search" id="tags" name="tags" pattern='[+-_a-zA-Z0-9]{2,}' value={newTag} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                                <button onClick={addTag} id="tagBtn" type="button">Add Tag</button>
                                <span className="validity"></span>

                            </div>

                            <p className={newTag === "" || newTag === [] || tagReg.test(newTag) ? 'hidden' : 'visible'}>Tags can only include letters, numbers, and these special characters: + - _</p>

                            <div className="chosenTags">
                                {tags.map((tag, index) =>
                                    <p key={index} onClick={removeTag}>{tag}</p>)}
                            </div>

                        </div>
                    </form>

                </div>
                <div className="footer">
                    <button onClick={submitNewGroupInfo}>Submit</button>
                    <button onClick={() => setOpenModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default EditGroupModal;