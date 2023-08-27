import { useEffect, useState } from 'react';
import './Mobile.css';
import {useNavigate, useParams } from "react-router-dom";
import { CreateConn } from '../../Utils/RealtimeService';

function SubmitMobile() {
    let navigate = useNavigate();
    let id = useParams();
    let textCode = id.textCod;
    const [question, setQuestion] = useState<any>("");
    const [connection, setConnection] = useState<any>("");
    
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

                        <img src="/Logo.png" className="logo" alt="logo"/>
                        {
                            textCode === "a" ? 
                            (
                                <h1 className='textWaiting'>Grazie per aver scelto!</h1>
                            ) 
                            : 
                            (
                                <h1 className='textWaiting'>Tempo scaduto!</h1>
                            )
                        }
                        <p style={{textAlign: "center"}} className='textWaiting descriptionWaiting'>
                            Attendi per altre votazioni
                        </p>
                    </div>
                </>
                )
                : question.type === "finished" ?
                    (
                        connection.stop(),
                        navigate("/mobile/termined/")
                    )
                    :
                    (
                        navigate("/mobile/question/"+id.showId, { state: question })
                    )
            }
        </>
    );
}

export default SubmitMobile;
