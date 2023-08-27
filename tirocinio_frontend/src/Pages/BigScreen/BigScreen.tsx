import { useEffect, useRef, useState } from "react";
import { CreateConn, CreateConnBigScreen } from "../../Utils/RealtimeService";
import { BarChart } from '@mui/x-charts/BarChart';
import "./BigScreen.css";
import { TakeAnswerId, TakeAnswerUser, TakeUserShowId } from "../../Utils/ResultService";
import { useParams } from "react-router-dom";
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
import { createDataGraphDinamically, createDinamically, createDinamicallyAnswer, options } from "../../Utils/BigScreenService";
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April'];

export function BigScreen() {

    let id = useParams();
    let showReId = id.showId;
    const [question, setQuestion] = useState<any>("");
    const [showChart, setShowChart] = useState<boolean>(false);
    const [end, setEnd] = useState<boolean>(false);
    const data = useRef<any>(null);


    useEffect(() => {
        const connect = async () => {
            await CreateConnBigScreen(setQuestion);
        }

        const ShowQuestion = async (questionId:any, questionText:any) => {
            if(question !== "") {
                if(question.type === "question") {
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

                    let a = createDinamicallyAnswer(questionText, partecipanti.length, votanti, answers[0],answers[1],answers[2],answers[3]);  
                    let labels = createDataGraphDinamically(a);
                    
                    //Check empty answer 
                    let v = createDinamically(votazioni[0],votazioni[1],votazioni[2],votazioni[3]);

                    data.current = {
                        labels,
                        datasets: [
                            {
                                label: 'Votazioni',
                                data: v,
                                backgroundColor: 'rgb(207, 175, 108)',
                            }
                        ],
                    };

                    setShowChart(true);
                }else if(question.type === "finished")
                    setEnd(true);
            }
        }

        connect();
        ShowQuestion(question.domandaId, question.domanda);

    }, [question]);

    return (
        <>
            <div className="containerAll">
                <div className="w3-row topRow topResult">
                    <div className="my-center">
                        {
                            end ? 
                            (
                                <h1 style={{color: 'white', fontSize: '50px', textAlign: 'center'}}>Spettacolo terminato</h1>
                            )
                            : 
                            (
                                showChart ?
                                (
                                    <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>{question.domanda}</h1>
                                )
                                :
                                (
                                    <h1 style={{color: 'white', fontSize: '50px', textAlign: 'center'}}>Benvenuti</h1>
                                )
                            )
                        }       
                    </div>
                </div>
                <div className="w3-row bottomRow bottomResult">
                        {   
                            end ?
                            (
                                <>
                                    <div className="myCenterBigScreen">
                                        <p  style={{color: 'white', fontSize: '20px', textAlign: 'center'}}>Ci siamo lasciati trasportare dalle note 
                                        e dalle emozioni, ma ogni viaggio ha la sua destinazione finale. Con profonda gratitudine e cuori pieni, 
                                        giungiamo alla fine di questo straordinario spettacolo musicale. Le melodie che abbiamo condiviso continueranno
                                        a risuonare nei nostri ricordi, e le emozioni vissute insieme rimarranno incise nei nostri cuori. Grazie 
                                        per essere stati parte di questo momento unico e indimenticabile. Che la musica continui a ispirare 
                                        le nostre vite e a unirci con il suo linguaggio universale. Arrivederci e a presto!</p>
                                    </div>
                                </>
                            )
                            :
                            (
                                !showChart ?
                                (
                                    <>  
                                        <div className="myCenterBigScreen">
                                            <p  style={{color: 'white', fontSize: '20px', textAlign: 'center'}}>Cari ospiti e appassionati, è con gioia e entusiasmo che vi diamo il più caloroso benvenuto 
                                                allo spettacolo che avete tanto atteso. Preparatevi a immergervi in un mondo di emozioni, 
                                                magia e intrattenimento straordinario. Siete i protagonisti di questa serata indimenticabile,
                                                e siamo grati per la vostra presenza qui. Rilassatevi, lasciatevi trasportare e godetevi 
                                                ogni istante di spettacolo che sta per iniziare. Buon divertimento!</p>
                                                
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className='grafico'>
                                            <Bar options={options} data={data.current} />
                                        </div>
                                    </>
                                )
                            )
                        }
                </div>
            </div>
        </>
    );
}

export default BigScreen;