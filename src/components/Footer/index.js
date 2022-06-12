import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './style.css';

function Footer() {
    let navigate = useNavigate();
    const footerOnClick = (e) => {
        navigate(`/faq`)

    }

    return (
        <footer>

            <p onClick={footerOnClick}>Frequently Asked Questions</p>

        </footer>
    );

};

export default Footer;