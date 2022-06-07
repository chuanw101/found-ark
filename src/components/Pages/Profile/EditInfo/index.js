import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

function EditInfo({ user }) {
    const [region, setRegion] = useState(user.region);
    const [introduction, setIntroduction] = useState(user.introduction);
    // const [allChars, setAllChars] = useState('');

    // const token = localStorage.getItem('foundArkJwt');
    // const tokenData = jwtDecode(token);


    // const getAllChars = async () => {
    //     try {
    //         const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${tokenData.id}`)
    //         setAllChars(res.data)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     getAllChars();
    // }, []);

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

    const submitNewProfInfo = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/users/${user.id}`, {
                region: region,
                introduction: introduction,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            console.log(res)
            window.location.reload(true);
        } catch (err) {
            if (err?.response?.data?.msg === 'an error occured') {
                alert("An error occured")
            }
            console.log(err);
        };
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

                    <button type="submit" onClick={submitNewProfInfo}>Edit</button>
                </form>
            </div>
        </div>

    )
}

export default EditInfo;