import React, { useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import './style.css';


function CreateGroup() {
    const [selectedTimezone, setSelectedTimezone] = useState({})
    return (

        <div className="page">

            <h1>Create Group</h1>

            <form method="post">
                <div class="container">
                    <label for="groupName"><b>Group Name</b></label>
                    <input type="text" placeholder="Enter Group Name" name="groupName" required />

                    <label for="description"><b>Description</b></label>
                    <input type="text" placeholder="Description" name="description" required />

                    <label for="dayofweek"><b>Day</b></label>
                    <select name="dayofweek" multiple={true} value={[]}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>

                    <label for="timezone"><b>Time Zone</b></label>
                    <blockquote>Please make a selection:</blockquote>
                    <div name="timezone" className="select-wrapper">
                        <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                        />

                        <label for="time"><b>Time</b></label>
                        <input type="time" placeholder="Time" name="time" required />

                        <div>
                            <label for="tags">Group Tags</label>
                            <input type="search" id="tags" name="tags" pattern='[+-_a-zA-Z0-9]{2,}'></input>
                            <button type="button">Add Tag</button>
                            <span class="validity"></span>
                        </div>

                        <button type="submit">Create Group</button>
                    </div>
                </div>
            </form>

        </div>
    );

};

export default CreateGroup;