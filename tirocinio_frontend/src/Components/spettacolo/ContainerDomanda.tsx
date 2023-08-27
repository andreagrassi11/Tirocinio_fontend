import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface Props {
    Titolo: any,
    Durata: any,
    Copertina: any
}

function ContainerDomanda({Titolo,Durata,Copertina}: Props) {


    let navigate = useNavigate();

    return (
        <>
            <div className="containerSpettacolo">
                <div className="w3-row other">
                    <div className="w3-col m4 l4 copertina other" style={{backgroundImage: 'url(/'+Copertina+')'}}>
                        <h1>.</h1>
                    </div>
                    <div className="w3-col m8 l8 other">
                        <h1 className="text">Titolo: <span className="textSmall">{Titolo}</span></h1>
                        <p className="text">Durata: <span className="textSmall">{Durata}min</span></p>
                        <Button variant="contained" className="buttonVisualizza" onClick={() => {navigate("/homepage/visualizza/spettacoli")}}>Visualizza</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerDomanda;