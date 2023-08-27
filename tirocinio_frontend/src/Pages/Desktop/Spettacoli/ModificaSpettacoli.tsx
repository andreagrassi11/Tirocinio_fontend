import { Button, Grid, TextField, ThemeProvider, styled } from '@mui/material';
import './Spettacoli.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { CreateAnswer, CreateQuestion, DeleteQuestionAnswer, TakeAnswerId, TakeQuestionId, TakeShowId, UpdateAnswer, UpdateQuestion, UpdateShow, checkNotNull, checkNotNullField } from '../../../Utils/ShowService';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CssTextField } from '../../../Utils/StyleTextField';

function ModificaSpettacoli() {

    let navigate = useNavigate();
    let id = useParams();
    let jwtError = false;
    const [show, setShow] = useState<any>([]);
    const [questions, setQuestions] = useState([{id: 'q', domanda: '',risposte: [{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' }]}]);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState<any>(0);
    const [ErrorInput, setErrorInput] = useState(false);

    useEffect(() => {
        const check = async () => {
            jwtError = await checkJwt();

            if (jwtError)
                navigate("/");
        }

        const takeShow = async () => {
            let response:any = await TakeShowId(id.id);
            setTitle(response.title);
            setDuration(response.duration);
            setShow(response);
        }

        const takeAnswer = async (response:any) => {
            let questStructure:any = [];

            await Promise.all(response.map(async (question:any) => {
                let response:any = await TakeAnswerId(question.id);

                //Check empty answer 
                let risposta0 = response[0] !== undefined ? [response[0].id, response[0].description] : ['a1',''];
                let risposta1 = response[1] !== undefined ? [response[1].id, response[1].description] : ['a2',''];
                let risposta2 = response[2] !== undefined ? [response[2].id, response[2].description] : ['a3',''];
                let risposta3 = response[3] !== undefined ? [response[3].id, response[3].description] : ['a4',''];

                let quest = {id: question.id, 
                    domanda: question.text, 
                    risposte: [{ idR: risposta0[0], risposta: risposta0[1] },
                               { idR: risposta1[0], risposta: risposta1[1] },
                               { idR: risposta2[0], risposta: risposta2[1] },
                               { idR: risposta3[0], risposta: risposta3[1] }
                            ]};         

                questStructure = [...questStructure, quest];
            }));
            return questStructure;
        }

        const takeQuestionAnswer =  async () => {

            let questStructure:any = [];
            let response:any = await TakeQuestionId(id.id);
            questStructure = await takeAnswer(response);
            setQuestions(questStructure);
        }
        
        check();
        takeShow();
        takeQuestionAnswer();
    }, []);

    //Add or Remove Question
    const deleteQuestion = async (index:any) => {
        const updatedQuestions = [...questions];
        const removedElement = updatedQuestions.find((element) => element.id === index);
        const newArray = updatedQuestions.filter((element:any) => element.id !== index);
        setQuestions(newArray);

        await DeleteQuestionAnswer(removedElement);
    }

    const AddQuestion = () => {
        let Id = questions.length+1;
        setQuestions([...questions, {
            id: `q${Id}`,
            domanda: '',
            risposte: [
              { idR: 'a1', risposta: '' },
              { idR: 'a2', risposta: '' },
              { idR: 'a3', risposta: '' },
              { idR: 'a4', risposta: '' }
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
                  risposte: question.risposte.map((risposta:any) =>
                    risposta.idR === idRisposta
                      ? { ...risposta, 'risposta': event.target.value }
                      : risposta
                  ),
                }
              : question;
        });

        setQuestions(sdffssddf);
    };

    const CreateShowFunction = async () => {
        const regexPatternQuestion = /q\d/;
        const regexPatternAnswer = /a\d/;

        if(!checkNotNull(title, duration, questions)) {
            // modifica show
            let responseInfo: any = await UpdateShow(show.id, title, duration);

            // modifica o crea domanda
            questions.map(async (question:any) => {
                let responseQuestion:any;
                let questionId:any;

                if(regexPatternQuestion.test(question.id))
                    responseQuestion = await CreateQuestion(question.domanda, show.id);
                else
                    responseQuestion = await UpdateQuestion(question.id, question.domanda);
                
                if(responseQuestion.length === 1)
                    questionId = question.id;
                else 
                    questionId = responseQuestion[1].value;

                // modifica o crea risposte
                question.risposte.map(async (risposta:any) => {
                    if(regexPatternAnswer.test(risposta.idR))
                        await CreateAnswer(risposta.risposta, questionId);
                    else
                        await UpdateAnswer(risposta.idR, risposta.risposta);
                });
            });

            navigate("/homepage/crea/spettacoli/landingpage/om");
            
        }else setErrorInput(true);
    };

    return (
        <>
            <div className="containerAll" style={{backgroundImage: 'url('+show.coverImage+')'}}>
                <div className="w3-row topRowSpettacolo">
                    <div className="my-center">
                        <h1 style={{color:'#CFAF6C', fontSize:'50px', textAlign: 'center'}}>Modifica spettacolo</h1>
                    </div>
                </div>
                <div className="w3-row bottomRowSpettacolo">
                    <div className="w3-col s6 sxSpettacoli">
                        <div className="my-center">
                            <p className='iconText'>Nome Spettacolo</p>
                            <CssTextField error={ErrorInput} className='inputTitle' id="outlined-basic" label="Titolo Spettacolo" value={title} variant="outlined" onChange={(event) => handleChangeTitleShow(event)}/>

                            <p className='iconText'>Durata Spettacolo</p>
                            <CssTextField error={ErrorInput} className='inputTitle' id="outlined-basic" label="Durata Spettacolo" value={duration} variant="outlined" onChange={(event) => handleChangeDuration(event)}/>

                            <Button className="buttonSubmit" variant="contained" onClick={() => {CreateShowFunction()}}>Modifica</Button>
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
                                                <CssTextField error={ErrorInput} className='inputDomanda' value={question.domanda} label={"Domanda " + index} variant="outlined" onChange={(event) => handleChangeTitle(event, question.id)}/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <DeleteIcon onClick={() => {deleteQuestion(question.id)}} className='inputDomanda IconDelete'/>
                                            </Grid>
                                            {(question.risposte.map((risposta: any, indexR: any) => (
                                                <>
                                                    <Grid item xs={6}>
                                                        <CssTextField key={indexR} className='risposta' value={risposta.risposta} label={"Risposta "+indexR} variant="outlined" onChange={(event) => handleChangeAnswer(event, question.id, risposta.idR)}/>
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

export default ModificaSpettacoli;