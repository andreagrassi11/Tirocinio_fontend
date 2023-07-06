import { Avatar, Box, Button, Divider, TextField, Typography } from "@mui/material";
import './Login.css';

function Login() {

    return (
        <>
            <div className="container w3-display-middle">

                <img src="Logo.png" className="logo mx-auto"/>

                <div className="inputField">
                    <h3>Username</h3>
                    <TextField type="text" className="usernameInput" variant="outlined"/>
                </div>

                <div className="inputField">
                    <h3>Password</h3>
                    <TextField type="password" className="passwordInput" variant="outlined"/>
                </div>

                <Button sx={{backgroundColor: "#E4C5AF", color: 'black'}} variant="contained">Login</Button>
            </div>
        </>
    );
}

export default Login;