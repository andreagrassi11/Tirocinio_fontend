import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { useNavigate } from 'react-router-dom';
import { TakeShowRealized } from '../../../Utils/ResultService';
import { Grid, Stack } from '@mui/material';
import ContainerRisultati from '../../../Components/risultati/ContainerRisultati';
import ContainerAvvio from '../../../Components/avvioSpettacolo/ContainerAvvio';
import { CreateConn } from '../../../Utils/RealtimeService';


function AvviaSpettacoli() {

    let navigate = useNavigate();
    const [lists, setLists] = useState<any>([]);
    let jwtError = false;

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");

            localStorage.setItem("section", "avviaSpettacoli");
        }

        const takeShow = async () => {
            let response:any = await TakeShowRealized();

            await Promise.all(response.map((r:any) => {
                const updatedShowRealizeList = r.showRealizeList.filter((rr:any) => !rr.do);
                r.showRealizeList = updatedShowRealizeList;
            }));

            setLists(response);
        }

        check();
        takeShow();
    }, []);
    
    return (
        <>
             <Grid container className="gridTop">
                <Grid item xs={1}/>
                <Grid item xs={10} className="gridSxTop">
                    <h1 className="title">Avvio Spettacoli</h1>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
            
            <div className="scrollable-list">
                <Stack direction="column" className="stack">
                    {(lists.map((spettacolo: any, index: any) => (
                        spettacolo.showRealizeList.map((showrel:any) => (
                            <ContainerAvvio 
                                key={index} 
                                Id={spettacolo.show.id} 
                                Titolo={spettacolo.show.title} 
                                Durata={spettacolo.show.duration} 
                                Copertina={spettacolo.show.coverImage}
                                Luogo={showrel.place}
                                Data={showrel.date}
                                showReId={showrel.id}
                            />
                        ))
                    )))}               
                </Stack>
            </div>
        </>
    );
}

export default AvviaSpettacoli;