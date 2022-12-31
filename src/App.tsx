import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from "openai";


function App() {

  const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);



  const [story, setStory] = useState<string | undefined>("Coming ...");
  const [image, setImage] = useState<string | undefined>("");

  const [input, setInput] = useState<string | undefined>("");


  const generateStory = (() => {
    setImage("");
    setStory("");
    // declare the data fetching function
    const fetchData = async () => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
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
        size: "512x512",
      })
      return response;
    }

    fetchImageData().then(function (response) { 
      console.log(response)
      setImage(response.data.data[0].url); 
    
    }).catch(function (error) { console.log(error); });;
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={() => generateStory()}>Generate story</button>
        <p>
          <img src={image}></img>
        </p>
        <p>
          {story}
        </p>
        
        
      </header>
    </div>
  );
}

export default App;
