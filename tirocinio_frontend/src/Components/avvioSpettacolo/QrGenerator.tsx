import React, { useState } from 'react';
import QRCode from 'qrcode.react';

interface Props {
    text: any
}

function QrGenerator({text}:Props) {
  
    return (
        <QRCode value={text} />
    );
}

export default QrGenerator;