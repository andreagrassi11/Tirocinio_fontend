import axios from "axios";
import * as urls from "./urls.js";
import * as jose from 'jose';

//Check JWT
export async function checkJwt() {
    const jwt = localStorage.getItem("jwt");
    let jwtError = false;

    if (jwt !== null) {
        const claims = jose.decodeJwt(jwt);
        const actualTime = parseInt(Date.now() / 1000);

        if (actualTime > claims.exp) {
            jwtError = true;
        }

    } else jwtError = true;

    return jwtError;
}

//Do Login
export async function doLogin(email, password) {

    let isError = false;

    if (email && password) {

        await axios.post(urls.serverURL + '/Auth/login/', {
            "email": email,
            "password": password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => { console.log(response.data.token); localStorage.setItem("jwt", response.data.token); })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    let responseStatus = parseInt(error.response.status);
                    if (responseStatus === 400) {
                        console.log("Errore 400: Utente o password errati");
                    }
                    isError = true;

                } else if (error.request) {
                    console.log("Errore 500: errore server");
                    isError = true;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Errore:', error.message);
                    isError = true;
                }
            });
    } else {
        console.log("Non hai inserito dei dati");
        isError = true;
    }

    return isError;
}

//Take user info, 1 parameter
export async function TakeUserInfo(userId) {

    let responseData;
    let jwt = localStorage.getItem("jwt");

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/user/info/' + userId, {
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data;
    }).catch(function (error) {
        if (error.request) {
            console.log("Errore 500: errore server");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
        }
    });

    return responseData;
}

//Take user info from JWT
export async function TakeUserInfoFromJwt() {

    let responseData;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);
    let UserId = jwtDecode.user_id;

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/user/info/' + UserId, {
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data;
    }).catch(function (error) {
        if (error.request) {
            console.log("Errore 500: errore server");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
        }
    });

    return responseData;
}
