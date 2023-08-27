import './ContainerAvvio.css';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

interface Props {
    Titolo: any,
    Durata: any,
    Copertina: any,
    Id: any,
    Luogo: any, 
    Data: any,
    showReId:any
}

function ContainerAvvio({Id,Titolo,Durata,Copertina,Luogo,Data,showReId}: Props) {

    let navigate = useNavigate();

    let dataClean = Data.substring(0, 10); 

    return (
        <>
            <div className="containerSpettacolo">
                <div className="w3-row other">
                    <div className="w3-col m4 l4 copertina other" style={{backgroundImage: 'url('+Copertina+')'}}>
                        <h1 hidden>.</h1>
                    </div>
                    <div className="w3-col m8 l8 other">
                        <h1 className="textRisultati">Titolo: <span className="textSmall">{Titolo}</span></h1>
                        <p className="textRisultati">Luogo: <span className="textSmall">{Luogo}</span></p>
                        <p className="textRisultati">Data: <span className="textSmall">{dataClean}</span></p>
                        <Button variant="contained" className="buttonVisualizza" onClick={() => {navigate("/homepage/visualizza/avvia/spettacoli/"+Id+"/"+showReId)}}>Visualizza Show</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerAvvio;