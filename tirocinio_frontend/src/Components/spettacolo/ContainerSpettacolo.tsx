import Grid from "@mui/material/Grid";
import './ContainerSpettacolo.css';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteShow, DeleteShowQuestionAnswer } from "../../Utils/ShowService";

interface Props {
    Titolo: any,
    Durata: any,
    Copertina: any,
    Id: any
}

function ContainerSpettacolo({Id,Titolo,Durata,Copertina}: Props) {

    let navigate = useNavigate();

    //Add or Remove Question
    const deleteQuestion = async () => {
        await DeleteShowQuestionAnswer(Id);
        window.location.reload();
    }

    return (
        <>
            <div className="containerSpettacolo">
                <div className="w3-row other">
                    <div className="w3-col m4 l4 copertina other" style={{backgroundImage: 'url('+Copertina+')'}}>
                        <h1 hidden>.</h1>
                    </div>
                    <div className="w3-col m8 l8 other">
                        <h1 className="text">Titolo: <span className="textSmall">{Titolo}</span></h1>
                        <p className="text">Durata: <span className="textSmall">{Durata}min</span></p>
                        <DeleteIcon onClick={() => {deleteQuestion()}} className='buttonDeleteShow'/>
                        <Button variant="contained" className="buttonVisualizza" onClick={() => {navigate("/homepage/visualizza/spettacoli/"+Id)}}>Visualizza</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerSpettacolo;