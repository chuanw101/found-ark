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

            <p className="FAQLink" onClick={footerOnClick}>FAQ</p>
            <p className="disclaimer">FoundArk isn't endorsed by Amazon Games or Smilegate and doesn't reflect the views or opinions of Amazon Games, Smilegate or anyone officially involved in producing or managing Lost Ark.</p>

        </footer>
    );

};

export default Footer;