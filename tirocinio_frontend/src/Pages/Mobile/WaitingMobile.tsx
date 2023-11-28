import { useEffect, useState } from 'react';
import { CreateConn, ReceiveMessage } from '../../Utils/RealtimeService';
import './Mobile.css';
import {useNavigate, useParams } from "react-router-dom";
import { Button } from '@mui/material';
import Timer from '../Desktop/Avvia spettacoli/Timer';

function WaitingMobile() {
    let navigate = useNavigate();
    let id = useParams();
    const [connection, setConnection] = useState<any>("");
    const [question, setQuestion] = useState<any>("");

    useEffect(() => {
        
        const connect = async () => {
            setConnection(await CreateConn(setQuestion));
        }
        connect();
    }, []);

    return (
        <>
            {question === "" ? 
                (
                    <>
                        <div className="container-mobile waiting w3-display-middle">

                            <img src="/Logo.png" className="logo" alt="logo" onClick={() => {navigate("/mobile/question")}}/>

                            <h1 className='textWaiting'>Benvenuto nello spettacolo!</h1>
                            <p className='textWaiting descriptionWaiting'>Siamo entusiasti di averti qui per una serata 
                            indimenticabile di pura musica e divertimento.
                            </p>
                            <p className='textWaiting descriptionWaiting'>
                            Resta in attesa, perché stai per essere catapultato in un mondo 
                            di opzioni straordinarie.</p>
                        </div>
                    </>
                )
                : 
                (
                    navigate("/mobile/question/"+id.showId, { state: question })
                )
            }
            
        </>
    );
}

export default WaitingMobile;
