import React, { useState, useEffect } from 'react';

interface Props {
    setEnd: any
}

function Timer({setEnd}: Props) {
    const initialTime = 10;
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {

            if (time > 0)
                setTime(prevTime => prevTime - 1);
            else
                setEnd(true);

        }, 1000); 

        return () => clearInterval(intervalId);
    }, [time]);

    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;
        return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    };

    return (
        <>
            {formatTime(time)}
        </>
    );
}

export default Timer;
