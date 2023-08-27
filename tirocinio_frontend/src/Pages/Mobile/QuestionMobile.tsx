import { Button } from "@mui/material";
import './Mobile.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timer from "../Desktop/Avvia spettacoli/Timer";
import { useEffect, useState } from "react";
import { CreateConn } from "../../Utils/RealtimeService";
import { CreateResult } from "../../Utils/MobileService";

function QuestionMobile() {
    let navigate = useNavigate();
    let id = useParams();
    const location = useLocation();
    let userId = localStorage.getItem("idUser");
    const [receivedProps, setReceivedProps] = useState(location.state);
    const [question, setQuestion] = useState<any>("");
    const [connection, setConnection] = useState<any>("");
    const [timerEnd, setTimerEnd] = useState<boolean>(false);
    let answers = ["1", "2", "3", "4"];
    
    useEffect(() => {
        
        const connect = async () => {
            setConnection(await CreateConn(setQuestion));
        }
        connect();
    }, []);

    const TakeUserAnswer = async (answerId:any) => {
        await CreateResult(id.showId, userId, receivedProps.domandaId, answerId);
        navigate("/mobile/confirm/submit/"+id.showId+"/a");
    }

    if(timerEnd)
        navigate("/mobile/confirm/submit/"+id.showId+"/te");

    return (
        <>
            <div className="container-mobile waiting w3-display-middle">

                <img src="/Logo.png" className="logo" alt="logo"/>

                <h3 className="textWaiting titleWaiting">{receivedProps.domanda}</h3>
                
                {(answers.map((answer: any, index: any) => {
                    const Testo = `risposta${index + 1}Testo`;
                    const Id = `risposta${index + 1}Id`;

                    if(receivedProps[Testo]) {
                        return (
                            <Button className="buttonResponse" key={index} variant="contained" onClick={() => {TakeUserAnswer(receivedProps[Id])}}>{receivedProps[Testo]}</Button>
                        )
                    }
                    
                }))}

                <p className="textWaiting">Tempo rimanente per la votazione: </p>
                <p className="textWaiting"><Timer setEnd={setTimerEnd}/></p>
            </div>
        </>
    );
}

export default QuestionMobile;
