import React, { useEffect, useState } from 'react';
import introImg from './storyteller.jpeg';
import loadingImg from './200w.gif';

import './App.css';
import { Configuration, OpenAIApi } from "openai";


function App() {

  const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);



  const [story, setStory] = useState<string | undefined>("Ready");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>("");

  const [input, setInput] = useState<string | undefined>("");


  const generateStory = (() => {
    setLoading(true);
    setImage("");
    setStory("");
    // declare the data fetching function
    const fetchData = async () => {
      const response = await openai.createCompletion({
        model: "text-curie-001",
        prompt: "generate story for 5 years old kid : " + input,
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        best_of: 1
      });
      return response;
    }

    fetchData().then(function (response) { 
      setStory(response.data.choices[0].text); 
    
    }).catch(function (error) { console.log(error); });;

    // declare the data fetching function
    const fetchImageData = async () => {
      const response = await openai.createImage({
        prompt: input || "",
        n: 1,
        size: "256x256",
      })
      return response;
    }

    fetchImageData().then(function (response) { 
      console.log(response)
      setImage(response.data.data[0].url); 
      setLoading(false);
    
    }).catch(function (error) { console.log(error); });;

    
  });

  return (
    <div className="App">
      <header className="App-header">
      <p>
          Story teller for 5 years old kids
        </p>
        <img src={introImg}  alt="story teller" width="150" height="150"/>
        <p>
          Add words and generate your story
        </p>
        <input size={50} type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={() => generateStory()}>Generate story</button>
        <p>
          <img src={image}></img>
        </p>
        <p>
          {loading ? (<img src={loadingImg}  alt="creating story" />) : story}
        </p>
        
        
      </header>
    </div>
  );
}

export default App;