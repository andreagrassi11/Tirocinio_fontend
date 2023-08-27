import { useNavigate } from 'react-router-dom';
import './Avvia.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export function FineSpettacolo() {

    let navigate = useNavigate();

    const goToResult =  () => {
        navigate("/homepage/risultati");
    }

    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url(/copertina.jpg)'}}>
                <div className="w3-row topRow topResult">
                    <div className="my-center">
                        <p style={{color: 'white',fontSize: '30px', textAlign: 'center'}}></p>
                    </div>
                </div>
                <div className="w3-row bottomRow bottomResult">
                    <div className="my-center divResultShow">
                        <CheckCircleIcon className='iconErrorResultShow'/>
                        <h1>Lo spettacolo è terminato</h1>
                        <p style={{marginTop: '40px'}}>Per visualizzare i risultati, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToResult()}}>vai alla lista dei risultati</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FineSpettacolo;