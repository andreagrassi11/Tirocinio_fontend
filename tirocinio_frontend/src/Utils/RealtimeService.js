import * as signalR from "@microsoft/signalr";
import * as urls from "./urls.js";
import axios from "axios";
import * as jose from 'jose';

export function CreateConn(setQuestion, setConnected) {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl(
            urls.serverURL + '/realtime',
            {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }
        )
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(function () {
            console.log("Connected to the hub.");
        })
        .catch(function (err) {
            console.error(err.toString());
        });

    connection.on("ReceiveMessage", function (response) {
        setQuestion(response);
    });

    connection.on("ClientCountUpdated", function (count) {
        setConnected(Math.floor(count / 2));
    });

    return connection;
}

export function CreateConnBigScreen(setQuestion) {
    let connection = new signalR.HubConnectionBuilder()
        .withUrl(
            urls.serverURL + '/bigscreenresult',
            {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }
        )
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(function () {
            console.log("Connected to the hub.");
        })
        .catch(function (err) {
            console.error(err.toString());
        });

    connection.on("ReceiveMessageBigScreen", function (response) {
        setQuestion(response);
    });

    return connection;
}

export function SendMessageBigScreen(connection, type, questionToSend) {

    let rr = {
        user: "Server",
        type: type,
        domanda: questionToSend.domanda,
        domandaId: questionToSend.domandaId,
        risposta1Id: questionToSend.risposta1Id,
        risposta1Testo: questionToSend.risposta1Testo,
        risposta2Id: questionToSend.risposta2Id,
        risposta2Testo: questionToSend.risposta2Testo,
        risposta3Id: questionToSend.risposta3Id,
        risposta3Testo: questionToSend.risposta3Testo,
        risposta4Id: questionToSend.risposta4Id,
        risposta4Testo: questionToSend.risposta4Testo
    };

    connection.invoke("SendMessageToBigScreen", rr)
        .catch(function (err) {
            console.error(err.toString());
        });
}

export function SendMessage(connection, type, questionToSend) {

    let rr = {
        user: "Server",
        type: type,
        domanda: questionToSend.domanda,
        domandaId: questionToSend.domandaId,
        risposta1Id: questionToSend.risposta1Id,
        risposta1Testo: questionToSend.risposta1Testo,
        risposta2Id: questionToSend.risposta2Id,
        risposta2Testo: questionToSend.risposta2Testo,
        risposta3Id: questionToSend.risposta3Id,
        risposta3Testo: questionToSend.risposta3Testo,
        risposta4Id: questionToSend.risposta4Id,
        risposta4Testo: questionToSend.risposta4Testo
    };

    connection.invoke("SendMessageToServer", rr)
        .catch(function (err) {
            console.error(err.toString());
        });
}

export function ReceiveMessage(connection) {

    // Event listener for "ReceiveMessage" event
    connection.on("ReceiveMessage", function (user, message) {
        // Handle the received message here
        console.log(`${user}: ${message}`);
    });


}

