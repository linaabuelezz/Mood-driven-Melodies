import { useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [mood, setMood] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood.trim() || mood.length < 3) {
      setErrorMessage("Please enter a mood.");
      return;
    }
    const regex = /^[a-zA-Z\s]{3,20}$/;
    if (!regex.test(mood)) {
      setErrorMessage(
        "Please enter a valid mood (letters only, 3-20 characters)."
      );
      return;
    }
    setErrorMessage("");
    setLoading(true);
    console.log(mood);
    fetchData();
  };

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are supposed to be a music expert who is in touch with many genres, so suggest a song that a person might like to listen to while they are ${mood}. Just provide the name of the song and the artist. Suggest one song but make it different each time the prompt is called, so have alot of options and select one.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyC_2lx6K_Ic8atbSm3OloqJWUieeVAvjp4"
  );
  return (
    <div className="bg-gray-200 min-h-screen p-0 pt-8 text-center">
      <h1 className="font-bold text-2xl pb-6">Mood-driven melodies</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4 mb-4"
      >
        <label htmlFor="input" className="font-mono">
          Please enter a word to describe your mood.
        </label>
        <br></br>
        <input
          type="text"
          id="input"
          className="border-2 border-gray-200 my-6 rounded-l"
          onChange={(e) => setMood(e.target.value)}
        ></input>
        <br></br>
        <button
          type="submit"
          className="bg-blue-800 rounded-xl p-2  shadow-lg text-white font-mono"
        >
          Load suggestion
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
      <div className="">
        <h2 className="font-mono mb-4">Song suggestions:</h2>
        <div className="border-2 border-gray-500 p-4 rounded-lg max-w-sm mx-auto">
          {!loading && <p className="text-align-left">{apiData}</p>}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
