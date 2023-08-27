import Grid from "@mui/material/Grid";
import ContainerSpettacolo from "../../../Components/spettacolo/ContainerSpettacolo";
import { Avatar, Button, Stack } from "@mui/material";
import './Spettacoli.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkJwt } from "../../../Utils/AuthService";
import { TakeShow } from "../../../Utils/ShowService";

function Spettacoli() {

    let navigate = useNavigate();
    const [lists, setLists] = useState<any>([]);
    let jwtError = false;

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");

            localStorage.setItem("section", 'spettacoli');
        }

        const takeShow = async () => {
            let response = await TakeShow();
            setLists(response);
        }

        check();
        takeShow();
    }, []);

    return (
        <>
            <Grid container className="gridTop">
                <Grid item xs={1}/>
                <Grid item xs={5} className="gridSxTop">
                    <h1 className="title">Spettacoli</h1>
                </Grid>
                <Grid item xs={5} className="gridDxTop">
                    <Button variant="contained" className="iconAdd w3-right" onClick={() => {navigate("/homepage/crea/spettacoli")}}>Nuovo Spettacolo</Button>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
            
            <div className="scrollable-list">
                <Stack direction="column" className="stack">
                    {(lists.map((spettacolo: any, index: any) => (
                        <ContainerSpettacolo key={index} Id={spettacolo.id} Titolo={spettacolo.title} Durata={spettacolo.duration} Copertina={spettacolo.coverImage}/>
                    )))}               
                </Stack>
            </div>
        </>
    );
}

export default Spettacoli;