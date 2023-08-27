import './Risultati.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { TakeShowId } from '../../../Utils/ShowService';
import { TakeAnswerId, TakeAnswerUser, TakeQuestionShowRealizedId, TakeShowRealizedId, TakeUserShowId } from '../../../Utils/ResultService';
import { AllSeriesType, BarChart } from '@mui/x-charts';

function VisualizzaRisultati() {

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

        //Check empty answer 
        let risposta0 = answers[0] !== undefined ? answers[0].description : "";
        let risposta1 = answers[1] !== undefined ? answers[1].description : "";
        let risposta2 = answers[2] !== undefined ? answers[2].description : "";
        let risposta3 = answers[3] !== undefined ? answers[3].description : "";

        setAnswers({domanda: questionText,
                partecipanti: partecipanti.length, 
                votanti: votanti, 
                risposta1Testo: risposta0, 
                risposta2Testo: risposta1,
                risposta3Testo: risposta2, 
                risposta4Testo: risposta3
            });


        //Check empty answer 
        let voti0 = votazioni[0] !== undefined ? votazioni[0].length : 0;
        let voti1 = votazioni[1] !== undefined ? votazioni[1].length : 0;
        let voti2 = votazioni[2] !== undefined ? votazioni[2].length : 0;
        let voti3 = votazioni[3] !== undefined ? votazioni[3].length : 0;

        setVoti([voti0,voti1,voti2,voti3]);
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
                        <p style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Numero Domande: {questions.length}</p>
                        <div className="scrollable-list-risultati-domande">
                            {(questions.map((question: any, index: any) => (
                                <h1 className='question' onClick={() => {ShowQuestion(question.id,question.text)}}>{(index+1) + ". "} <span className='q'>{question.text}</span></h1>
                            )))}
                        </div>
                    </div>
                    <div className="w3-col s6 dxRisultati">
                        {Object.keys(answers).length === 0 ? 
                            (<>
                                <div className="my-center">
                                    <h1 style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Selezionare domanda a sinistra</h1>
                                </div>
                            </>
                            )
                            :
                            (
                                <>
                                    <div className="my-center">
                                    <h1 style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Domanda: {answers.domanda}</h1>
                                        <h1 style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Numero partecipanti: {answers.partecipanti}</h1>
                                        <h1 style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Numero votanti: {answers.votanti}</h1>
                                        <div className='grafico'>
                                            <BarChart
                                                xAxis={[
                                                    {
                                                    id: 'barCategories',
                                                    data: ["1."+answers.risposta1Testo, "2."+answers.risposta2Testo, "3."+answers.risposta3Testo, "4."+answers.risposta4Testo],
                                                    scaleType: 'band',
                                                    },
                                                ]}
                                                series={[
                                                    {
                                                        data: voti
                                                    },
                                                ]}
                                                width={500}
                                                height={300}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default VisualizzaRisultati;