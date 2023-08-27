import './Home.css';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { useNavigate } from 'react-router-dom';
import { TakeShow } from '../../../Utils/ShowService';
import { TakeResultShow, TakeShowRealized, TakeUserShowId } from '../../../Utils/ResultService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const options = {
    plugins: {
      legend: {
        display: false // Hide the legend
      }
    }
  };
  

function Home() {

    let navigate = useNavigate();
    let jwtError = false;
    const [lists, setLists] = useState<any>([]);
    const [totPart, setTotPartecipanti] = useState<any>();
    const [totRes, setTotRes] = useState<any>();
    const [chartData, setChartData] = useState<any>([]);
    const [labels, setLabels] = useState<any>([]);

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");

            localStorage.setItem("section", 'home');
        }

        const takeShow = async () => {
            let count = 0;
            let response:any = await TakeShowRealized();
            
            response.map((r:any, index:any) => {
                count = count + r.showRealizeList.length;

                r.showRealizeList.map((rr:any) => {
                    labels.push(r.show.title + " - " + rr.place);
                });
            });
            
            setLists(count);
        }

        const takeUser = async () => {
            let idShowRel:any = [];
            let response:any = await TakeShowRealized();
            let totPartecipanti = 0;
            let totResult = 0;
            let chart:any = [];
            let backgroundColor:any = [];
            
            await Promise.all(response.map((resp:any) => {
                resp.showRealizeList.map((showRelList:any) => {
                    idShowRel.push(showRelList.id);
                });
            }));

            await Promise.all(idShowRel.map(async (id:any, index:any) => {
                let response:any = await TakeUserShowId(id);
                totPartecipanti = totPartecipanti + response.length;

                let result:any = await TakeResultShow(id);
                totResult = totResult + result.length; 

                chart.push(result.length);
                backgroundColor.push(getRandomColor());
            }));

            let rr = {
                labels: labels,
                datasets: [
                  {
                    label: 'Voti',
                    data: chart,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                  },
                ],
              };

            setChartData(rr);
            setTotPartecipanti(totPartecipanti);
            setTotRes(totResult);
        }

        check();
        takeShow();
        takeUser();
    }, []);


    return (
        <>
            <div className="containerAll">
                <div className="w3-row topRowHome">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'60px', textAlign: 'center'}}>Spettacoli</h1>
                    </div>
                </div>
                <div className="w3-row bottomRowHome">
                    <div className="w3-col s6 sxHome">
                        <div className="my-center">
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Totale spettacoli: {lists}</p>
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Totale partecipanti: {totPart}</p>
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Risposte Ricevute: {totRes}</p>
                        </div>
                    </div>
                    <div className="w3-col s6 dxHome">
                        <div className="my-center">
                            {
                                chartData.length !== 0 ?
                                (
                                    <div className='chart'>
                                        <Pie data={chartData} options={options}/>
                                    </div>
                                )
                                :
                                ("")
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;