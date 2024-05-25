import { useRouter } from "next/router";
import "./global.css";
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    return (
        <div key={router.pathname}>
            <Component {...pageProps} />
        </div>
    );
}

export default App;
