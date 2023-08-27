import { Avatar, Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography, styled } from "@mui/material";
import './Mobile.css';
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { CssCheckbox, CssTextField } from "../../Components/personalComponent/personalComponent";
import { useEffect, useState } from "react";
import { CreateUserShow, generateRandomEmail } from "../../Utils/MobileService";


function HomeMobile() {
    let navigate = useNavigate();
    let id = useParams();
    const [ErrorInput, setErrorInput] = useState(false);

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isError = false;
        let response:any;
        let privacyClean;
        const data = new FormData(event.currentTarget);
        //Take Value
        let email = data.get('email');
        let privacy = data.get('privacy');

        if(privacy === null)
            privacyClean = false;
        else
            privacyClean = true;

        if(email !== ''){
            response = await CreateUserShow(email, id.showId, privacyClean);
        }else {
            let e = generateRandomEmail();
            response = await CreateUserShow(e, id.showId, privacyClean);
        }
        
        if (!isError){
            localStorage.setItem("idUser", response[1].value.id);
            localStorage.setItem("emailUser", response[1].value.email);
            navigate("/mobile/waiting/"+id.showId);
        }else 
            setErrorInput(true);
    }

    return (
        <>
            <div className="container-mobile w3-display-middle">

                <img src="/Logo.png" className="logo" alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <div className="inputField">
                        <h3>Email</h3>
                        <CssTextField error={ErrorInput} type="email" className="emailInput" name="email" variant="outlined"/>
                    </div>

                    <div className="inputFieldPrivacy">
                        <FormGroup className="FormGroupPrivacy">
                            <FormControlLabel control={<CssCheckbox name="privacy"/>} className="privacy FormGroupPrivacy" label="Accetto la Privacy Policy" />
                        </FormGroup>
                    </div>

                    <Button className="buttonStart" variant="contained" type="submit">Accedi allo spettacolo</Button>
                </form>
            </div>
        </>
    );
}

export default HomeMobile;
