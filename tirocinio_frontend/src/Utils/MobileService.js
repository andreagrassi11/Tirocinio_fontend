import * as urls from "./urls.js";
import axios from "axios";
import * as jose from 'jose';

export function generateRandomEmail() {
    const emailChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomEmail = '';

    // Generate a random username of length 8
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * emailChars.length);
        randomEmail += emailChars[randomIndex];
    }

    // Add a domain
    randomEmail += '@guest.com';

    return randomEmail;
}

// Create Answer
export async function CreateUserShow(email, fK_ShowRealize, privacy) {

    let responseData;
    let jwtError = false;

    await axios.post(urls.serverURL + '/api/UserShow/', {

        "email": email.toString(),
        "fK_ShowRealize": fK_ShowRealize,
        "privacy": privacy
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data;
    }).catch(function (error) {
        if (error.request) {
            console.log("Errore 500: errore server");
            jwtError = true;
        } else {
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

export async function CreateResult(IdShowRealized, IdUserShow, IdQuestionResult, IdAnswerResult) {

    let responseData;
    let jwtError = false;

    await axios.post(urls.serverURL + '/api/Result', {

        "IdShowRealized": IdShowRealized,
        "IdUserShow": IdUserShow,
        "IdQuestionResult": IdQuestionResult,
        "IdAnswerResult": IdAnswerResult
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data;
    }).catch(function (error) {
        if (error.request) {
            console.log("Errore 500: errore server");
            jwtError = true;
        } else {
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}