import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import QRCode from 'qrcode.react';
import { Button, Grid } from '@mui/material';
import './Avvia.css';
import { frontURL } from '../../../Utils/urls';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { CreateConn, CreateConnBigScreen, ReceiveMessage, SendMessage, SendMessageBigScreen } from '../../../Utils/RealtimeService';
import { TakeShowId, UpdateShowResultDo } from '../../../Utils/ShowService';
import { TakeQuestionShowRealizedId, TakeShowRealizedId, TakeAnswerId } from '../../../Utils/ResultService';
import Timer from './Timer';
import Cronometro from '../../../Components/avvioSpettacolo/Cronometro';


export function AvvioSpettacolo() {

    let navigate = useNavigate();
    let id = useParams();
    let showId = id.showId;
    let showReId = id.showReId;
    let jwtError = false;
    const [dataClean, setdataClean] = useState<any>("");
    const [show, setShow] = useState<any>([]);
    const [showRel, setShowRel] = useState<any>([]);
    const [connection, setConnection] = useState<any>("");
    const [connectionBigScreen, setConnectionBigScreen] = useState<any>("");
    const [questions, setQuestions] = useState<any>([]);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [connected, setConnected] = useState("");
    const [termined, setTermined] = useState<boolean>(false);
    const [timerEnd, setTimerEnd] = useState<boolean>();

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
        }

        const takeShow = async () => {
            let response = await TakeShowId(showId);
            setShow(response);
        }

        const TakeShowRe = async () => {
            let response:any = await TakeShowRealizedId(showReId);
            setShowRel(response);
            setdataClean(response.date.substring(0, 10));
        }

        const TakeQuestionRe = async () => {
            let resp:any = await TakeQuestionShowRealizedId(showReId);
            const updatedQuestions = [];

            for (const [index, resps] of resp.entries()) {
                let answers:any = await TakeAnswerId(resps.id);
                let quantity = answers.length;
                let all:any = {domandaId: resps.id, domanda: resps.text};

                for(let i=0; i<quantity; i++){
                    let newVarId = "risposta"+(i+1)+"Id";
                    let newVar = "risposta"+(i+1)+"Testo";
                    all[newVarId] = answers[i].id;
                    all[newVar] = answers[i].description;
                }
                updatedQuestions.push(all);
            }

            setQuestions([...questions, ...updatedQuestions]);
        }
        
        const connect = async () => {
            setConnection(await CreateConn(null, setConnected));
        }

        const connectBigScreen = async () => {
            setConnectionBigScreen(await CreateConnBigScreen(null));
        }

        check();
        takeShow();
        TakeShowRe();
        TakeQuestionRe();
        connect();
        connectBigScreen();
    }, []);

    const sendMessages = async (questionToSend:any) => {
        if(questionIndex >= 0) 
            await SendMessage(connection, "question", questionToSend);

        const count = questionIndex + 1;

        if(count < questions.length) {
            setQuestionIndex(count);
            setTimerEnd(false);
        }else{
            setQuestionIndex(count);
            setTermined(true);
        }
    }

    const sendTerm = async () => {
        await SendMessage(connection, "finished", {});
        await SendMessageBigScreen(connectionBigScreen, "finished", {});
        await UpdateShowResultDo(showReId);
        navigate("/homepage/fine/spettacolo");
    }

    const sendResultBigScreen = async () => {
        await SendMessageBigScreen(connectionBigScreen, "question", questions[questionIndex-1]);
    }
    
    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url('+show.coverImage+')'}}>
                <div className="w3-row topRow topResult">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>{show.title}</h1>
                        <p style={{color:'white', fontSize:'30px', textAlign: 'center', marginTop: '5px', marginBottom: '5px'}}>Durata: {show.duration} minuti</p>
                        <p style={{color:'white', fontSize:'30px', textAlign: 'center', marginTop: '5px', marginBottom: '5px'}}>{showRel.place}, {dataClean}</p>
                    </div>
                </div>
                <div className="w3-row bottomRow bottomResult">
                    <div className="w3-col s6 sxRisultati">
                        <p style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Domande spettacolo</p>  
                        <div className="scrollable-list-risultati-domande">
                            {(questions.map((question: any, index: any) => (
                                index < questionIndex ? (
                                    <h1 key={index} className='question' style={{backgroundColor: 'grey'}}>{(index+1) + ". "} <span className='q'>{question.domanda}</span></h1>
                                )
                                :
                                (
                                    <h1 key={index} className='question'>{(index+1) + ". "} <span className='q'>{question.domanda}</span></h1>
                                )
                            )))}
                        </div>
                    </div>
                    <div className="w3-col s6 dxRisultati">
                        <div className="scrollable-list-risultati-domande realtime">
                            <div className="my-center">
                                {questions[questionIndex] ? (
                                    <>
                                        {questionIndex === 0 ? ("") : (
                                            <>
                                                <p className='textRealtime'><span style={{color: '#CFAF6C'}}>Domanda inviata:</span> {questions[questionIndex-1].domanda}</p>
                                                <p className='textRealtime'>Tempo rimasto: <Timer setEnd={setTimerEnd}/></p>
                                                <Button className='buttonRealtime' style={{marginTop: '50px'}} onClick={() => {sendResultBigScreen()}}>Pubblica risultati</Button>
                                                <hr style={{width: '70%', marginLeft: '15%', marginRight: '15%'}}></hr>
                                            </>
                                        )}

                                        <p className='textRealtime'><span style={{color: '#CFAF6C'}}>Domanda da inviare:</span> {questions[questionIndex].domanda}</p>
                                        <Grid container style={{width: '60%', marginLeft: '20%', marginRight: '20%'}}>
                                            <Grid item xs={6}>
                                                {questions[questionIndex].risposta1Testo ? (<p className='textRealtime answerRealtime'>{questions[questionIndex].risposta1Testo}</p>) : ""}
                                            </Grid>
                                            <Grid item xs={6}>
                                                {questions[questionIndex].risposta2Testo ? (<p className='textRealtime answerRealtime'>{questions[questionIndex].risposta2Testo}</p>) : ""}
                                            </Grid>
                                            <Grid item xs={6}>
                                                {questions[questionIndex].risposta3Testo ? (<p className='textRealtime answerRealtime'>{questions[questionIndex].risposta3Testo}</p>) : ""}
                                            </Grid>
                                            <Grid item xs={6}>
                                                {questions[questionIndex].risposta4Testo ? (<p className='textRealtime answerRealtime'>{questions[questionIndex].risposta4Testo}</p>) : ""}
                                            </Grid>
                                        </Grid>
                                        <Button className='buttonRealtime' style={{marginTop: '50px'}} onClick={() => {sendMessages(questions[questionIndex])}}>Invia</Button>
                                    </>
                                ) : (
                                    !termined ? 
                                    (
                                        <>
                                            <p className='textRealtime'>Inizia lo spettacolo con un semplice clic, premendo il pulsante qui sotto.</p>
                                            <Button className='buttonRealtime' onClick={() => {sendMessages(questions[questionIndex])}}>Inizia Spettacolo</Button>
                                        </>
                                    ) 
                                    : 
                                    (
                                        <>
                                            <p className='textRealtime'><span style={{color: '#CFAF6C'}}>Domanda inviata:</span> {questions[questionIndex-1].domanda}</p>
                                            <p className='textRealtime'>Tempo rimasto: <Timer setEnd={setTimerEnd}/></p>
                                            <Button className='buttonRealtime' style={{marginTop: '50px'}} onClick={() => {sendResultBigScreen()}}>Pubblica risultati</Button>
                                            <Button className='buttonRealtime' onClick={() => {sendTerm()}}>Termina Spettacolo</Button>
                                        </>
                                    )
                                )}
                                <Cronometro></Cronometro>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AvvioSpettacolo;

