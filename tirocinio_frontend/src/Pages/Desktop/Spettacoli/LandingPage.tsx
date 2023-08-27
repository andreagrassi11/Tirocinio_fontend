import { Button, Grid, TextField, styled } from '@mui/material';
import './Spettacoli.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

function LandingPage() {

    let navigate = useNavigate();
    let codError = useParams();
    let jwtError = false;
    const [renderCode, setRenderCode] = useState<any>();

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
        }

        const render = () => {
            switch(codError.err) {
                case 'n': setRenderCode(
                        <>
                            <CheckCircleIcon className='iconErrorResult'/>
                            <h1>Lo spettacolo è stato creato correttamente</h1>
                            <p style={{marginTop: '40px'}}>Per visualizzare lo spettacolo creato, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShow()}}>torna alla lista degli spettacoli</a></p>
                        </>);
                        break;
                case 's': setRenderCode(
                        <>
                            <DangerousIcon className='iconErrorResult'/>
                            <h1>Errore durante la creazione dello spettacolo</h1>
                            <p style={{marginTop: '40px'}}>Lo show non è stato creato per un errore del server, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShow()}}>torna alla lista degli spettacoli</a></p>
                        </>);
                        break;
                case 'q': setRenderCode(
                        <>
                            <DangerousIcon className='iconErrorResult'/>
                            <h1>Errore durante la creazione dello spettacolo</h1>
                            <p style={{marginTop: '40px'}}>Lo show è stato creato, ma non è stato possibile creare le domande, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShow()}}>torna alla lista degli spettacoli</a></p>
                        </>);
                        break;
                case 'a': setRenderCode(
                        <>
                            <DangerousIcon className='iconErrorResult'/>
                            <h1>Errore durante la creazione dello spettacolo</h1>
                            <p style={{marginTop: '40px'}}>Lo show e le domande sono state create, ma non è stato possibile creare le risposte, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShow()}}>torna alla lista degli spettacoli</a></p>
                        </>);   
                        break;
                
                case 'om': setRenderCode(
                    <>
                        <CheckCircleIcon className='iconErrorResult'/>
                        <h1>Lo spettacolo è stato modificato correttamente</h1>
                        <p style={{marginTop: '40px'}}>Per visualizzare lo spettacolo modificato, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShow()}}>torna alla lista degli spettacoli</a></p>
                    </>);   
                    break;

                case 'crs': setRenderCode(
                    <>
                        <CheckCircleIcon className='iconErrorResult'/>
                        <h1>Lo spettacolo è stato creato correttamente</h1>
                        <p style={{marginTop: '40px'}}>Per avviare lo spettacolo creato, <a style={{color: 'rgb(207, 175, 108)'}} onClick={() => {goToShowRel()}}>vai alla lista degli spettacoli</a></p>
                    </>);   
                    break;
            }
        }
        
        check();
        render();
    }, []);

    const goToShow =  () => {
        navigate("/homepage/spettacoli");
    }

    const goToShowRel =  () => {
        navigate("/homepage/avvia/spettacoli");
    }
    
    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url(/copertina.jpg)'}}>
                <div className="w3-row topRowSpettacolo">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>Creazione spettacolo</h1>
                    </div>
                </div>
                <div className="w3-row bottomRowSpettacolo">
                    <div className='divErrorResult my-center'>
                        {renderCode}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;