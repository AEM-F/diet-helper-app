import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './barcode-scanner.css';

import Html5QrcodePlugin from "./scanner2.component";

function BarcodeScanner(){
    const [result, setResult] = useState(null);
    //const [camera, setCamera] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let timeOfDay = location.state.timeOfDay;

    const onDetected = (decodedText, decodedResult) => {
        setResult(decodedText);
    };

    return (
        <div>
            <div className={'barcode-info'}>
                {result ?
                    <div className="typewriter">
                        <h1 style={{fontSize: 12}}>Barcode: {result}</h1>
                    </div>:
                    <div className="typewriter">
                        <h1>No barcode scanned...</h1>
                    </div>}
                <Html5QrcodePlugin
                    fps={30}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onDetected}/>
            </div>
        </div>
    );
}

export default BarcodeScanner;
