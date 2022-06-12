import React, { useState } from 'react';
import './style.css'

function FAQ() {
    return (
        <div className='page'>
            <div className="FAQMain">

               
                <h1>FAQ</h1>
                <div className='FAQ'>
                    <h4>Why can't I search for my character?</h4>
                    <p className='FAQanswer'>Character information is pulled from the Lost Ark Meta database! Follow <a href="https://lostark.meta-game.gg/armory?character=your%20character" target='_blank' rel='noopener noreferer' className="faqLink">these instructions</a> to add your character to the database, otherwise you can manually enter in your character information here on our site.</p>

                    <h4>Why does my discord server not embed?</h4>
                    <p className='FAQanswer'>To embed your discord, you need to invite the WidgetBot into your server. By following <a href="https://add.widgetbot.io/" target='_blank' rel='noopener noreferer'  className="faqLink">this link</a>, WidgetBot will be added to your server. Then type the prompt '/setup' in your channel and follow the instructions. Once the setup is done, come back to this site, and copy and paste the discord link, server id, and channel id into the corresponding inputs on the "Embed a Different Discord" form. Then you're done; the widget should be displaying your server and channels!</p>

                    <h4>Why can't I create a group?</h4>
                    <p className='FAQanswer'>Answer</p>

                    <h4>Why can't I join a group?</h4>
                    <p className='FAQanswer'>Answer</p>

                    <h4>Don't see your question?</h4>
                    <p className='FAQanswer'><a href='mailto: foundark.groupfinder@gmail.com' className='emailLink'>Send us an Email!</a></p>
                </div>
                </div>
            </div>
    );
};

export default FAQ;