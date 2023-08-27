import './Spettacoli.css';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { TakeShowId } from '../../../Utils/ShowService';

function VisualizzaSpettacoli() {

    let navigate = useNavigate();
    let id = useParams();
    let jwtError = false;
    const [lists, setLists] = useState<any>([]);

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
        }

        const takeShow = async () => {
            let response = await TakeShowId(id.id);
            setLists(response);
        }
        
        check();
        takeShow();
    }, []);
    
    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url('+lists.coverImage+')'}}>
                <div className="w3-row topRow">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>{lists.title}</h1>
                        <p style={{color:'white', fontSize:'30px', textAlign: 'center'}}>Durata: {lists.duration} minuti</p>
                    </div>
                </div>
                <div className="w3-row bottomRow">
                    <div className="w3-col s6 sx" onClick={() => {navigate("/homepage/modifica/spettacoli/"+lists.id)}}>
                        <div className="my-center">
                            <p className='iconText'><EditIcon className='iconSpettacolo'/></p>
                            <p className='iconText'>Modifica</p>
                        </div>
                    </div>
                    <div className="w3-col s6 dx">
                        <div className="my-center" onClick={() => {navigate("/homepage/crea/spettacolo/"+lists.id)}}>
                            <p className='iconText'><SaveIcon className='iconSpettacolo'/></p>
                            <p className='iconText'>Crea Spettacolo</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VisualizzaSpettacoli;