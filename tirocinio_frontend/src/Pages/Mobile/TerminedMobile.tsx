import { useEffect, useState } from 'react';
import './Mobile.css';
import {useNavigate, useParams } from "react-router-dom";
import { CreateConn } from '../../Utils/RealtimeService';

function TerminedMobile() {

    

    return (
        <>
            <div className="container-mobile waiting w3-display-middle">

                <img src="/Logo.png" className="logo" alt="logo"/>

                <h1 className='textWaiting'>Terminato</h1>
                <p style={{textAlign: "center"}} className='textWaiting descriptionWaiting'>
                    Grazie per aver partecipato
                </p>
            </div>
        </>
    );
}

export default TerminedMobile;
