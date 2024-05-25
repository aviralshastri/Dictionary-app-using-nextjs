import React, { useEffect, useState, useCallback } from "react";
import Page from "../components/page";
import Image from "next/image";
import Logo from "../assets/LogoLarge.png";
import ReactAudioPlayer from "react-audio-player";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import {
  FaHandPointRight,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { CgEditBlackPoint } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";



const Home = () => {
  const [token, setToken] = useState(null);
  const [word, setWord] = useState(null);
  const [phonetic, setPhonetic] = useState(null);
  const [data, setData] = useState(null);
  const [footersticked, setFooterSticked] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
  }, []);


  const fetchWordData = useCallback(async (word) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setData(data);
      toast.success("Result fetched!");
      setWord(data[0]?.word);
      setPhonetic(data[0]?.phonetic);
      setError(null);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError(error.message);
      toast.error("Word not found! Check the spelling.");
    }
  }, []);

  const handleToggleListening = useCallback(() => {
    if (listening) {
      setToken(transcript);
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening, resetTranscript, transcript]);

  const handleSearchClick = useCallback(() => {
    setFooterSticked(false);
    fetchWordData(token);
  }, [fetchWordData, token]);

  if (!isClient) {
    return null;
  }

  if (!browserSupportsSpeechRecognition) {
    toast.error("Browser does not support speech recognition.");
  }

  return (
    <Page duration={0.5}>
      <ToastContainer
        pauseOnHover={false}
        autoClose={5000}
        position="top-center"
        stacked={true}
      />
      <div className="flex flex-col justify-center items-center mt-10">
        <Image
          className="items-center justify-center w-3/5 h-3/5 md:w-1/5 md:h-1/5"
          src={Logo}
          alt="Logo"
        />
        <h1 className="font-bold text-4xl lg:text-6xl mb-10">Dictionary</h1>
      </div>
      <div className="flex justify-center flex-col items-center px-4 md:px-2 sm:px-10">
        <div className="flex flex-col sm:flex-row border border-solid w-full gap-2 sm-w-3/5 md:w-4/5 lg:w-2/3 xl:w-1/2 items-center justify-center border-black p-4 md:p-8 m-4 rounded-xl shadow-2xl">
          <input
            placeholder="Enter the word"
            className="px-4 py-2 border text-semibold text-sm sm:text-xl border-solid border-black rounded-xl w-full"
            onChange={(e) => setToken(e.target.value)}
            spellCheck="true"
            value={token}
          />
          <div className="flex flex-row">
            <button
              className="px-10 py-2 text-sm sm:text-xl rounded-xl w-full sm:w-auto text-center font-bold bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              onClick={handleSearchClick}
            >
              Search
            </button>
            <button
              onClick={handleToggleListening}
              className="px-4 py-2 ml-2 bg-blue-500 border-2 border-blue-500 hover:bg-blue-600 hover:border-blue-600 rounded-xl"
            >
              {listening ? (
                <FaMicrophoneSlash className="text-white" size={20} />
              ) : (
                <FaMicrophone className="text-white" size={20} />
              )}
            </button>
          </div>
        </div>
        {word && (
          <div
            className={`mb-24 flex flex-col border border-solid w-full sm:w-3/5 md:w-4/5 lg:w-2/3 xl:w-1/2 border-black p-8 m-4 rounded-xl shadow-2xl`}
          >
            <h1 className="text-4xl mb-4">
              <b className="font-bold">{word}</b>{" "}
              <i className="text-3xl">{phonetic}</i>
            </h1>
            {data?.[0]?.phonetics?.map((phonetic, index) => (
              <div key={index}>
                <h1 className="text-2xl font-semibold mt-4">{phonetic.text}</h1>
                <ReactAudioPlayer src={phonetic.audio} controls />
              </div>
            ))}
            {data?.[0]?.meanings?.map((meaning, index) => (
              <div key={index} className="mt-4">
                <div className="flex items-center mt-10">
                  <CgEditBlackPoint className="mt-2 mr-2 h-8 w-8" />
                  <h1 className="text-4xl font-semibold">
                    {meaning.partOfSpeech}{" "}
                    <i className="text-2xl text-gray-800">(Part Of Speech)</i>
                  </h1>
                </div>
                <div className="flex items-center mt-8 ml-3">
                  <FaHandPointRight className="mr-2 h-6 w-6 flex-shrink-0" />
                  <h1 className="text-2xl font-semibold">
                    <b>Definition</b>
                  </h1>
                </div>
                {meaning.definitions.map((definition, index) => (
                  <div key={index} className="flex items-center mt-4 ml-6">
                    <VscDebugBreakpointLog className="mr-2 h-6 w-6 flex-shrink-0" />
                    <h1 className="text-2xl font-semibold">
                      {definition.definition}
                    </h1>
                  </div>
                ))}
                <div className="flex items-center mt-8 ml-3">
                  <FaHandPointRight className="mr-2 h-6 w-6 flex-shrink-0" />
                  <h1 className="text-2xl font-semibold">
                    <b>Example</b>
                  </h1>
                </div>
                {meaning.definitions.map((definition, index) => (
                  <div
                    key={index}
                    className={`flex items-center mt-4 ml-6 ${
                      definition.example ? "" : "hidden"
                    }`}
                  >
                    <VscDebugBreakpointLog className="mr-2 h-6 w-6 flex-shrink-0" />
                    <h1 className="text-2xl font-semibold">
                      {definition.example}
                    </h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className={`border-t-2 border-dark lg:text-sm xl:text-lg px-4 bg-black ${ footersticked? "fixed bottom-0":"" } w-full`}>
        <div className="py-4 md:py-8  flex flex-col md:flex-row items-center justify-center md:space-x-10 text-white">
          <span className="mb-2 md:mb-0 text-white text-center items-center justify-center">
            Built By Aviral Shastri
          </span>
          <span className="mb-2 md:mb-0 text-white text-center items-center justify-center">
              Credits to DictionaryAPI for the data. <a href="https://dictionaryapi.dev/" className="text-yellow-600">
              (https://dictionaryapi.dev/)
            </a>
          </span>
          <span className="mb-2 md:mb-0 text-white text-center items-center justify-center">
            Contact:{" "}
            <a
              href="mailto:aviralshastri01042005@gmail.com"
              className="text-yellow-600"
            >
              aviralshastri01042005@gmail.com
            </a>
          </span>
          <span className="mb-2 md:mb-0 text-white text-center items-center justify-center">
            {new Date().getFullYear()} © All Rights Reserved
          </span>
        </div>
      </footer>
    </Page>
  );
};

export default Home;
