
export const createDinamicallyAnswer = (questionText: any, partecipantiLength: any, votanti: any, risposta0: any, risposta1: any, risposta2: any, risposta3: any) => {

    let variableToReturn: any;

    if (risposta0 !== undefined) {
        if (risposta1 !== undefined) {
            if (risposta2 !== undefined) {
                if (risposta3 !== undefined) {
                    variableToReturn = {
                        domanda: questionText,
                        partecipanti: partecipantiLength,
                        votanti: votanti,
                        risposta1Testo: risposta0.description,
                        risposta2Testo: risposta1.description,
                        risposta3Testo: risposta2.description,
                        risposta4Testo: risposta3.description
                    };
                } else variableToReturn = {
                    domanda: questionText,
                    partecipanti: partecipantiLength,
                    votanti: votanti,
                    risposta1Testo: risposta0.description,
                    risposta2Testo: risposta1.description,
                    risposta3Testo: risposta2.description,
                };
            } else variableToReturn = {
                domanda: questionText,
                partecipanti: partecipantiLength,
                votanti: votanti,
                risposta1Testo: risposta0.description,
                risposta2Testo: risposta1.description,
            };
        } else variableToReturn = {
            domanda: questionText,
            partecipanti: partecipantiLength,
            votanti: votanti,
            risposta1Testo: risposta0.description,
        };
    } else variableToReturn = {};

    return variableToReturn;
}
        
export const createDinamically = (voti0: any, voti1: any, voti2: any, voti3: any) => {

    let variableToReturn: any;

    if (voti0 !== undefined) {
        if (voti1 !== undefined) {
            if (voti2 !== undefined) {
                if (voti3 !== undefined) {
                    variableToReturn = [voti0.length, voti1.length, voti2.length, voti3.length];
                } else variableToReturn = [voti0.length, voti1.length, voti2.length];
            } else variableToReturn = [voti0.length, voti1.length];
        } else variableToReturn = [voti0.length];
    } else variableToReturn = [];

    return variableToReturn;
}
        
export const createDataGraphDinamically = (a: any) => {

    let variableToReturn: any;

    if (a.risposta1Testo !== undefined) {
        if (a.risposta2Testo !== undefined) {
            if (a.risposta3Testo !== undefined) {
                if (a.risposta4Testo !== undefined) {
                    variableToReturn = ["1." + a.risposta1Testo, "2." + a.risposta2Testo, "3." + a.risposta3Testo, "4." + a.risposta4Testo];
                } else variableToReturn = ["1." + a.risposta1Testo, "2." + a.risposta2Testo, "3." + a.risposta3Testo,];
            } else variableToReturn = ["1." + a.risposta1Testo, , "2." + a.risposta2Testo,];
        } else variableToReturn = ["1." + a.risposta1Testo];
    } else variableToReturn = [];

    return variableToReturn;
}

export const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white',
                font: {
                    size: 30
                }
            },
            position: 'top' as const
        },
    },
    scales: {
        x: {
            ticks: { 
                color: 'white', 
                font: {
                    size: 25
                }, 
                beginAtZero: true 
            }
        },
        y: {
            ticks: { 
                color: 'white', 
                font: {
                    size: 25
                }, 
                beginAtZero: true 
            }
        }
      }
};

        