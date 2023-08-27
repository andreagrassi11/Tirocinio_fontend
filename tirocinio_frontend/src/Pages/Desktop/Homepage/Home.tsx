import { PieChart } from '@mui/x-charts/PieChart';
import './Home.css';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { useNavigate } from 'react-router-dom';
import { TakeShow } from '../../../Utils/ShowService';
import { TakeResultShow, TakeShowRealized, TakeUserShowId } from '../../../Utils/ResultService';

function Home() {

    let navigate = useNavigate();
    let jwtError = false;
    const [lists, setLists] = useState<any>([]);
    const [totPart, setTotPartecipanti] = useState<any>();
    const [totRes, setTotRes] = useState<any>();
    const [chartData, setChartData] = useState<any>([]);

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");

            localStorage.setItem("section", 'home');
        }

        const takeShow = async () => {
            let response = await TakeShowRealized();
            setLists(response);
        }

        const takeUser = async () => {
            let idShowRel:any = [];
            let response:any = await TakeShowRealized();
            let totPartecipanti = 0;
            let totResult = 0;
            let chart:any = [];
            
            response.map((resp:any) => {
                resp.showRealizeList.map((showRelList:any) => {
                    idShowRel.push(showRelList.id);
                });
            });

            await Promise.all(idShowRel.map(async (id:any, index:any) => {
                let response:any = await TakeUserShowId(id);
                totPartecipanti = response.length;

                let result:any = await TakeResultShow(id);
                totResult = result.length; 

                let rr = {'id': index,'value': response.length, 'label': 'Spettacolo'+index};
                chart = [...chart, rr];
            }));

            setChartData([...chartData, chart])
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
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Totale spettacoli: {lists.length}</p>
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Totale partecipanti: {totPart}</p>
                            <p style={{color:'white', fontSize:'25px', textAlign: 'center'}}>Risposte Ricevute: {totRes}</p>
                        </div>
                    </div>
                    <div className="w3-col s6 dxHome">
                        <div className="my-center">
                            {
                                chartData.length !== 0 ?
                                (<PieChart
                                    className='chart'
                                    series={[
                                        {
                                        data: chartData[0],
                                        },
                                    ]}
                                    width={500}
                                    height={200}
                                />)
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