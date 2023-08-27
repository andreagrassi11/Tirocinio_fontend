import Grid from "@mui/material/Grid";
import { Avatar, Button, Stack } from "@mui/material";
import './Risultati.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkJwt } from "../../../Utils/AuthService";
import { TakeShowRealized } from "../../../Utils/ResultService";
import ContainerRisultati from "../../../Components/risultati/ContainerRisultati";

function Risultati() {

    let navigate = useNavigate();
    const [lists, setLists] = useState<any>([]);
    let jwtError = false;

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
            
            localStorage.setItem("section", 'risultati');
        }

        const takeShow = async () => {
            let response:any = await TakeShowRealized();

            await Promise.all(response.map((r:any) => {
                const updatedShowRealizeList = r.showRealizeList.filter((rr:any) => rr.do);
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
                    <h1 className="title">Risultati</h1>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
            
            <div className="scrollable-list">
                <Stack direction="column" className="stack">
                    {(lists.map((spettacolo: any, index: any) => (
                        spettacolo.showRealizeList.map((showrel:any) => (
                            <ContainerRisultati 
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

export default Risultati;