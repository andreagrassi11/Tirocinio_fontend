import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { TakeShowId } from '../../../Utils/ShowService';
import { TakeAnswerId, TakeAnswerUser, TakeQuestionShowRealizedId, TakeShowRealizedId, TakeUserShowId } from '../../../Utils/ResultService';
import { BarChart } from '@mui/x-charts';
import QRCode from 'qrcode.react';
import { Button } from '@mui/material';
import './Avvia.css';
import { frontURL, serverURL } from '../../../Utils/urls';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';


function VisualizzaAvvio() {

    let navigate = useNavigate();
    let id = useParams();
    let showId = id.showId;
    let showReId = id.showReId;
    let jwtError = false;
    const [dataClean, setdataClean] = useState<any>("");
    const [show, setShow] = useState<any>([]);
    const [showRel, setShowRel] = useState<any>([]);
    const [questions, setQuestions] = useState<any>([]);
    const [answers, setAnswers] = useState<any>({});
    const [voti, setVoti] = useState<any>([1,2,3,4]);
    const qrCodeRef = useRef<any>(null);

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
            let response:any = await TakeQuestionShowRealizedId(showReId);
            setQuestions(response);
        }
        
        check();
        takeShow();
        TakeShowRe();
        TakeQuestionRe();
    }, []);

    const ShowQuestion = async (questionId:any, questionText:any) => {

        let votanti:any = 0;
        let votazioni:any = [];
        let partecipanti:any = await TakeUserShowId(showReId);
        let answers:any = await TakeAnswerId(questionId);
        
        await Promise.all(
            answers.map(async (answer:any, index:any) =>{
                let resp:any = await TakeAnswerUser(showReId, questionId, answer.id);
                
                votanti = votanti + resp.length;
                votazioni.splice(index, 0, resp);
            })
        );

        setAnswers({domanda: questionText,
                partecipanti: partecipanti.length, 
                votanti: votanti, 
                risposta1Testo: answers[0].description, 
                risposta2Testo: answers[1].description,
                risposta3Testo: answers[2].description, 
                risposta4Testo: answers[3].description
            });

        setVoti([votazioni[0].length,votazioni[1].length,votazioni[2].length,votazioni[3].length]);
    }

    const downloadQRCode = () => {
        const canvas:any = document.querySelector('canvas'); // Get the canvas element
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataURL;
        link.click();
    };
    
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
                        <p style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Qr Code</p>
                        <QRCode className="qrcode" value={frontURL + "/mobile/"+showReId} ref={qrCodeRef}/>
                        <Button className="buttonSubmit" variant="contained"  onClick={downloadQRCode}>Download QR Code</Button>
                    </div>
                    <div className="w3-col s6 dxRisultati Avvia" onClick={() => {window.open(frontURL+'/bigscreen/'+showReId, '_blank');navigate("/homepage/inizio/spettacolo/"+showId+"/"+showReId)}}>
                        <div className="my-center">
                            <p className='iconText'><PlayCircleFilledWhiteIcon className='iconSpettacolo'/></p>
                            <p className='iconText'>Inizio Spettacolo</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VisualizzaAvvio;