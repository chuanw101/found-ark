import React, { useState } from 'react';

function Error() {

    return (
        <div className="page login">
            <div className="darkContainerWrapped FourContainer">

                <h1 className="FourErr">ERROR 404</h1>
                <div className="FourErrMsg">
                    <p>Ark Not Found!</p>
                </div>

                <img src="/assets/images/error/indianajones.png" height="400px" />

            </div>
        </div>

    );
};

export default Error;