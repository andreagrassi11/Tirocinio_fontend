import { Button, Grid, TextField, styled } from '@mui/material';
import './Spettacoli.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { CreateAnswer, CreateQuestion, CreateShow, checkNotNullField } from '../../../Utils/ShowService';
import { Console } from 'console';
import { CssTextField } from '../../../Utils/StyleTextField';

function CreaSpettacoli() {

    let navigate = useNavigate();
    let id = useParams();
    let jwtError = false;
    const [questions, setQuestions] = useState([{id: 1, domanda: '',risposte: [{ idR: 1, risposta: '' },{ idR: 2, risposta: '' },{ idR: 3, risposta: '' },{ idR: 4, risposta: '' }]}]);
    const [title, setTitle] = useState();
    const [duration, setDuration] = useState();
    const [base64Image, setBase64Image] = useState<any>();
    const [ErrorInput, setErrorInput] = useState(false);

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
        }
        
        check();
    }, []);

    //Add or Remove Question
    const deleteQuestion = async (index:any) => {
        const updatedQuestions = [...questions];
        const newArray = updatedQuestions.filter((element:any) => element.id !== index);
        setQuestions(newArray);
    }

    const AddQuestion = () => {
        let Id = questions.length+1;
        setQuestions([...questions, {
            id: Id,
            domanda: '',
            risposte: [
              { idR: 1, risposta: '' },
              { idR: 2, risposta: '' },
              { idR: 3, risposta: '' },
              { idR: 4, risposta: '' }
            ]
        }]);
    };

    //Save question change
    const handleChangeTitle = (event: any, idDomanda:any) => {

        const updatedQuestions = [...questions];
        const sdf = updatedQuestions.map(question =>
            question.id === idDomanda ? { ...question, 'domanda': event.target.value } : question
        );
        
        setQuestions(sdf);
    };

    const handleChangeTitleShow = (event: any) => {

        setTitle(event.target.value);
        
    };

    const handleChangeDuration = (event: any) => {

        setDuration(event.target.value);
    };

    const handleChangeAnswer = (event: any, idDomanda:any, idRisposta:any) => {

        const updatedQuestions = [...questions];
        const sdffssddf = updatedQuestions.map((question) => {
            return question.id === idDomanda
              ? {
                  ...question,
                  risposte: question.risposte.map((risposta) =>
                    risposta.idR === idRisposta
                      ? { ...risposta, 'risposta': event.target.value }
                      : risposta
                  ),
                }
              : question;
        });

        setQuestions(sdffssddf);
    };

    //Image base64
    const handleUploadClick = async (event: any) => {
        let imageBase64;

        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = async function (e) {
                imageBase64 = reader.result;
                setBase64Image(imageBase64);
            };
        }
    };

    const CreateShowFunction = async () => {

        var path = "/homepage/crea/spettacoli/landingpage/";

        if(!checkNotNullField(title, duration, base64Image, questions)) {

            let responseInfo: any = await CreateShow(title, duration, base64Image);
    
            if (responseInfo[0])
                navigate(path + "s");
    
            let showId = responseInfo[1].value;
    
            questions.map(async (question) => {
                let responseQuestion: any = await CreateQuestion(question.domanda, showId);
    
                if(responseQuestion[0]) 
                    navigate(path + "q");
    
                question.risposte.map(async (risposta) => {
    
                    if(risposta.risposta !== '') {
                        let responseAnswer: any = await CreateAnswer(risposta.risposta, responseQuestion[1].value);
                        
                        if(responseAnswer[0])
                            navigate(path + "a"); 
                    }
                });
            });
    
            navigate(path + "n");

        }else setErrorInput(true);
    };
    
    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url(/copertina.jpg)'}}>
                <div className="w3-row topRowSpettacolo">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>Creazione spettacolo</h1>
                    </div>
                </div>
                <div className="w3-row bottomRowSpettacolo">
                    <div className="w3-col s6 sxSpettacoli">
                        <div className="my-center">
                            <p className='iconText'>Nome Spettacolo</p>
                            <CssTextField error={ErrorInput} className='inputTitle' id="outlined-basic" label="Titolo Spettacolo" variant="outlined" onChange={(event) => handleChangeTitleShow(event)}/>

                            <p className='iconText'>Durata Spettacolo</p>
                            <CssTextField error={ErrorInput} className='inputTitle' id="outlined-basic" label="Durata    Spettacolo" variant="outlined" onChange={(event) => handleChangeDuration(event)}/>
                            
                            <input className='fileUpload my-center' type='file' accept='image/png,image/jpeg,image/jpg' onChange={handleUploadClick}/>

                            <Button className="buttonSubmit" variant="contained" onClick={() => {CreateShowFunction()}}>Crea</Button>
                        </div>
                    </div>
                    <div className="w3-col s6 dxSpettacoli">
                        <p className='iconText'>Domande</p>
                        <p style={{textAlign: 'center',color: 'rgb(207, 175, 108)'}} onClick={() => {AddQuestion()}}><AddCircleOutlineIcon/> Aggiungi Domanda</p>
                        <div className='scrollable-list-crea-domande'>
                            {(questions.map((question: any, index: any) => (
                                <>
                                    <div className='domanda' key={index}>
                                        <Grid container>
                                            <Grid item xs={9}>
                                                <CssTextField error={ErrorInput} className='inputDomanda' label={"Domanda " + index} variant="outlined" onChange={(event) => handleChangeTitle(event, question.id)}/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <DeleteIcon onClick={() => {deleteQuestion(question.id)}} className='inputDomanda IconDelete'/>
                                            </Grid>
                                            {(question.risposte.map((risposta: any, indexR: any) => (
                                                <>
                                                    <Grid item xs={6}>
                                                        <CssTextField className='risposta' label={"Risposta "+indexR} variant="outlined" onChange={(event) => handleChangeAnswer(event, question.id, risposta.idR)}/>
                                                    </Grid>
                                                </>
                                            )))} 
                                        </Grid>
                                    </div>

                                    <hr style={{width: '60%',marginLeft: '20%',marginRight: '20%', marginTop: '40px'}}></hr>
                                </>
                            )))}   
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreaSpettacoli;