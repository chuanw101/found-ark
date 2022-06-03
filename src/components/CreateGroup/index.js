import React, { useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import './style.css';


function CreateGroup() {
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [newTag, setTag] = useState("")
    const [tags, addNewTag] = useState([]);
    const [day, setDay] = useState([]);

    const addTag = () => {
        addNewTag([...tags, newTag]);
        console.log(tags)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setTag(value)
        }
        if (name === 'dayofweek') {
            setDay(value)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const removeTag = (e) => {
        console.log(e.target.innerText)
        const newTags = tags.filter(tag => tag != e.target.innerText);
        addNewTag(newTags);
    }


    return (

        <div className="page">

            <h1>Create Group</h1>

            <form method="post" className="createGroup">
                <label htmlFor="groupName"><b>Group Name</b></label>
                <input type="text" placeholder="Enter Group Name" name="groupName" onChange={handleInputChange} required />

                <label htmlFor="description"><b>Description</b></label>
                <input type="text" placeholder="Description" name="description" onChange={handleInputChange} required />

                <label htmlFor="discord"><b>Discord</b></label>
                <input type="url" placeholder="https://discord.com" name="discord" pattern="https://.*" onChange={handleInputChange} required />


                <label htmlFor="dayofweek"><b>Day</b></label>
                <select name="dayofweek" onChange={handleInputChange}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>

                <label htmlFor="timezone"><b>Time Zone</b></label>
                <blockquote>Please make a selection:</blockquote>
                <div name="timezone" className="select-wrapper">
                    <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                    />

                    <label htmlFor="time"><b>Time</b></label>
                    <input type="time" placeholder="Time" name="time" onChange={handleInputChange} required />

                    <div>
                        <label htmlFor="tags">Group Tags</label>
                        <input type="search" id="tags" name="tags" pattern='[+-_a-zA-Z0-9]{2,}' value={newTag} onChange={handleInputChange}></input>
                        <button onClick={addTag} id="tagBtn" type="button">Add Tag</button>
                        <span className="validity"></span>

                        <div className="chosenTags">
                            {tags.map((tag, index) =>
                                <p key={index} onClick={removeTag}>{tag}</p>)}
                        </div>
                    </div>

                    <button type="submit" onClick={handleFormSubmit}>Create Group</button>
                </div>
            </form>

        </div>
    );
};

export default CreateGroup;