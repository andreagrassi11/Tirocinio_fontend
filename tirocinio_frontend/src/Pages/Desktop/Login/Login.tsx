import { Avatar, Box, Button, Divider, TextField, Typography, styled } from "@mui/material";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkJwt, doLogin } from "../../../Utils/AuthService";
import { CssTextField } from "../../../Components/personalComponent/personalComponent";


function Login() {

    //Variable declaration
    const navigate = useNavigate();
    const [ErrorInput, setErrorInput] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    //Functions
    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Regola la larghezza dello schermo in base alle tue esigenze
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Chiamata iniziale per impostare lo stato corretto

        const check = async () => {
            localStorage.removeItem("section");
            let jwtError = await checkJwt();
            if (!jwtError)
                navigate("/homepage");
        }

        check();

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isError = false;
        const data = new FormData(event.currentTarget);
        //Take Value
        let username = data.get('username');
        let password = data.get('password');
        
        isError = await doLogin(username, password);

        if (!isError) navigate("/homepage");
        else setErrorInput(true);
    }

    return (
        <>
            {isMobile ? (
                <div className="container-warning w3-display-middle">

                    <img src="/Logo.png" className="logo" alt="logo"/>

                    <h1 className='textWaiting'>Accesso da dispositivi mobili non consentito.</h1>
                    <p className='textWaiting descriptionWaiting'>
                        Accedi da un dispositivo desktop
                    </p>
                </div>
            ) : (
                <div className="container w3-display-middle">
                    <img src="Logo.png" className="logo my-center-logo"/>

                    <form onSubmit={handleSubmit}>
                        <div className="inputField">
                            <h3 className="nameTextfield">Username</h3>
                            <CssTextField error={ErrorInput} type="text" name="username" className="usernameInput" variant="outlined"/>
                        </div>

                        <div className="inputField">
                            <h3 className="nameTextfield">Password</h3>
                            <CssTextField error={ErrorInput} type="password" name="password" className="passwordInput" variant="outlined"/>
                        </div>

                        <Button type="submit" className="buttonLogin" variant="contained">Login</Button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Login;