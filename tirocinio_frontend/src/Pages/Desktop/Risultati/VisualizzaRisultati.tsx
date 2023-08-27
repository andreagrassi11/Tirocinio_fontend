import './Risultati.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { TakeShowId } from '../../../Utils/ShowService';
import { TakeAnswerId, TakeAnswerUser, TakeQuestionShowRealizedId, TakeShowRealizedId, TakeUserShowId } from '../../../Utils/ResultService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { createDataGraphDinamically, createDinamically, createDinamicallyAnswer, options, optionsRisultati } from '../../../Utils/BigScreenService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const labels = ['January', 'February', 'March', 'April'];

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
    const [data, setData] = useState<any>(null);

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
        console.log(answers);
        
        await Promise.all(
            answers.map(async (answer:any, index:any) =>{
                let resp:any = await TakeAnswerUser(showReId, questionId, answer.id);
                
                votanti = votanti + resp.length;
                votazioni.splice(index, 0, resp);
            })
        );

        let a = createDinamicallyAnswer(questionText, partecipanti.length, votanti, answers[0],answers[1],answers[2],answers[3]);  
        let labels = createDataGraphDinamically(a);
        
        //Check empty answer 
        let v = createDinamically(votazioni[0],votazioni[1],votazioni[2],votazioni[3]);

        setAnswers({domanda: questionText, partecipanti: partecipanti.length, votanti: votanti});
        setData({
            labels,
            datasets: [
                {
                    label: 'Votazioni',
                    data: v,
                    backgroundColor: '#02B2AF',
                }
            ],
        });
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
                        {data === null ? 
                            (<>
                                <div className="my-center">
                                    <h1 style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Selezionare domanda a sinistra</h1>
                                </div>
                            </>
                            )
                            :
                            (
                                <>
                                    <div className="my-center" style={{height: '80%'}}>
                                    <h1 style={{color: 'white', textAlign: 'center', fontSize: '25px'}}>Domanda: {answers.domanda}</h1>
                                        <h1 style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Numero partecipanti: {answers.partecipanti}</h1>
                                        <h1 style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Numero votanti: {answers.votanti}</h1>
                                        <div className='grafico'>
                                            <Bar options={optionsRisultati} data={data} />
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