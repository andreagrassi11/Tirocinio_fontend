import './Spettacoli.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkJwt } from '../../../Utils/AuthService';
import { CreateAnswerResult, CreateQuestionResult, CreateShowRel, TakeAnswerId, TakeQuestionId, TakeShowId } from '../../../Utils/ShowService';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { CssTextField } from '../../../Utils/StyleTextField';

function CreaSpettacoloRel() {

    let navigate = useNavigate();
    let id = useParams();
    let jwtError = false;
    const [lists, setLists] = useState<any>([]);
    const [ErrorInput, setErrorInput] = useState(false);
    const [questions, setQuestions] = useState([{id: 'q', domanda: '',risposte: [{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' },{ idR: 'a', risposta: '' }]}]);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //Take Value
        let luogo = data.get('luogo');
        let date = data.get('data');

        if(luogo && date){
            let response:any = await CreateShowRel(luogo,date, id.id);
            let ShowRelId = response[1].value.id;

            questions.map(async (question) => {
                let responseQuestion: any = await CreateQuestionResult(question.domanda, ShowRelId);
                console.log(responseQuestion);
    
                /*if(responseQuestion[0]) 
                    navigate(path + "q");*/
    
                question.risposte.map(async (risposta) => {
    
                    if(risposta.risposta !== '') {
                        let responseAnswer: any = await CreateAnswerResult(risposta.risposta, responseQuestion[1].value.id);
                        
                        /*if(responseAnswer[0])
                            navigate(path + "a"); */
                    }
                });
            });

            navigate("/homepage/crea/spettacoli/landingpage/crs");

        }else setErrorInput(true);
    }
    
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
                    <form onSubmit={handleSubmit}>
                        <p className='iconText'>Luogo Spettacolo</p>
                        <CssTextField error={ErrorInput} name="luogo" type='text' className='inputTitle' id="outlined-basic" label="Titolo Spettacolo" variant="outlined"/>

                        <p className='iconText'>Data</p>
                        <CssTextField error={ErrorInput} name="data" type='date' className='inputTitle' id="outlined-basic" variant="outlined"/>

                        <Button type='submit' className="buttonSubmit" variant="contained">Crea</Button>
                    </form>
                    
                </div>
            </div>
        </>
    );
}

export default CreaSpettacoloRel;