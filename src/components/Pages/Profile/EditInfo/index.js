import React, { useState } from 'react';
import './style.css'

function EditInfo({ handleEditSubmit }) {
    const [region, setRegion] = useState('NAE');
    const [introduction, setIntroduction] = useState('');

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;
        // set value based on name
        if (name === 'region') {
            setRegion(value);
        } else if (name === 'introduction') {
            setIntroduction(value);
        }
    };

    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
        const editData = { region, introduction };
        handleEditSubmit(editData);

    }

    return (
        <div className="page">
            <div className='darkContainerWrapped'>
            <h1>Edit Profile</h1>

            <form method="post">
                <label htmlFor="region"><b>Region</b></label>
                <select name="region" onChange={handleInputChange} value={region}>
                    <option value="NAE">NAE</option>
                    <option value="NAW">NAW</option>
                    <option value="EUW">EUW</option>
                    <option value="EUC">EUC</option>
                    <option value="SA">SA</option>
                </select>

                <label htmlFor="introduction"><b>Introduction</b></label>
                <input type="text" placeholder="Introduction..." name="introduction" value={introduction} onChange={handleInputChange} />

                <button type="submit" onClick={handleFormSubmit}>Edit</button>
            </form>
            </div>
        </div>

    )
}

export default EditInfo;