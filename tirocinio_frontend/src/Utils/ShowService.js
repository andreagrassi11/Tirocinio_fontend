import * as urls from "./urls.js";
import axios from "axios";
import * as jose from 'jose';

export async function TakeShow() {

    let responseData;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);
    let UserId = jwtDecode.NameIdentifier;

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/api/Show/' + String(UserId), {
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data.value;
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

export async function TakeShowId(showId) {

    let responseData;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/api/Show/' + showId, {
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data.value;
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

// Create Show
export async function CreateShow(title, duration, coverImage) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);
    let UserId = jwtDecode.NameIdentifier;

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/Show/', {

        "title": title.toString(),
        "duration": duration,
        "coverImage": coverImage.toString(),
        "userId": UserId.toString()
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
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

// Create Question
export async function CreateQuestion(text, fK_Show) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/Question/', {

        "text": text.toString(),
        "fK_Show": fK_Show
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
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

// Create Answer
export async function CreateAnswer(description, fK_Question) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/Answer/', {

        "description": description.toString(),
        "fK_Question": fK_Question
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

// check Not Null Field
export function checkNotNullField(title, duration, base64Image, questions) {

    if (!title)
        return true;

    if (!duration)
        return true;

    if (!base64Image)
        return true;

    if (questions.length === 0)
        return true;

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].domanda === '')
            return true;
    }

    return false;
}

export function checkNotNull(title, duration, questions) {

    if (!title)
        return true;

    if (!duration)
        return true;

    questions.map((question) => {
        if (!questions[0].domanda)
            return true;
    });

    return false;
}

export async function TakeQuestionId(showId) {

    let responseData;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/api/Question/TakeQuestionRelShow/' + showId, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data.value;
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

export async function TakeAnswerId(questionId) {

    let responseData;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.get(urls.serverURL + '/api/Answer/TakeAnswerRelQuestion/' + questionId, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        responseData = response.data.value;
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

export async function DeleteQuestionAnswer(removedElement) {
    const regexPattern = /q\d/;

    //map and delete answer
    removedElement.risposte.map(async (risposta) => {
        if (risposta.idR !== 'a1' && risposta.idR !== 'a2' && risposta.idR !== 'a3' && risposta.idR !== 'a4')
            await DeleteAnswer(risposta.idR);
    });

    //delete question
    if (!regexPattern.test(removedElement.id))
        await DeleteQuestion(removedElement.id);
}

// Delete Answer
export async function DeleteAnswer(answerId) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.delete(urls.serverURL + '/api/Answer/' + answerId, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}

export async function DeleteShowQuestionAnswer(showId) {

    let questions = await TakeQuestionId(showId);

    questions.map(async (question) => {
        let answers = await TakeAnswerId(question.id);

        answers.map(async (answer) => {
            await DeleteAnswer(answer.id);
        });

        await DeleteQuestion(question.id);
    });

    await DeleteShow(showId);
}

// Delete Show
export async function DeleteShow(showId) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.delete(urls.serverURL + '/api/Show/' + showId, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}

// Delete Question
export async function DeleteQuestion(questionId) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.delete(urls.serverURL + '/api/Question/' + questionId, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}

// Update Show
export async function UpdateShow(showId, title, duration) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.put(urls.serverURL + '/api/Show/', {

        "id": showId,
        "title": title.toString(),
        "duration": duration
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}

// Update Question
export async function UpdateQuestion(questionId, text) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.put(urls.serverURL + '/api/Question/', {

        "id": questionId,
        "text": text.toString(),
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            return [true];

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return [true];
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return [true];
        }
    });

    return [false];
}

// Update Answer
export async function UpdateAnswer(answerId, description) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.put(urls.serverURL + '/api/Answer/', {

        "id": answerId,
        "description": description.toString(),
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}

// Create Question
export async function CreateShowRel(place, date, fkShow) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/ShowRealize/', {

        "place": place.toString(),
        "date": date,
        "fK_Show": fkShow
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
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

// Create question result
export async function CreateQuestionResult(text, fK_Show) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/QuestionResult', {

        "text": text.toString(),
        "fK_ShowReal": fK_Show
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
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

// Create answer result
export async function CreateAnswerResult(text, fK_QuestionResult) {

    let responseData;
    let jwtError = false;
    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.post(urls.serverURL + '/api/AnswerResult', {

        "description": text.toString(),
        "fK_QuestionResult": fK_QuestionResult
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
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            jwtError = true;
        }
    });

    return [jwtError, responseData];
}

// Update Show to do
export async function UpdateShowResultDo(showId) {

    let jwt = localStorage.getItem("jwt");
    let jwtDecode = jose.decodeJwt(jwt);

    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

    await axios.put(urls.serverURL + '/api/ShowRealize/' + showId, {
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            let responseStatus = parseInt(error.response.status);
            if (responseStatus === 401 || responseStatus === 400) {
                console.log("Errore 401 or 400: Bad Request");
                console.log(error);
                return true;
            } else if (responseStatus === 409) {
                console.log("Errore 409: Conflict! Utente gia registrato");
                return true;
            }

        } else if (error.request) {
            console.log("Errore 500: Errore server");
            return true;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Errore:', error.message);
            return true;
        }
    });

    return false;
}