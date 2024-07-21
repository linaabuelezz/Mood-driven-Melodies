import { useState, useEffect } from "react";
import "../../App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../../fonts.css";
import Typing from 'react-typing-effect';

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
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
    fetchData();
  };

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are supposed to be a music expert who is in touch with many genres, so suggest a song that a person might like to listen to while they are ${mood}. Just provide the name of the song and the artist. Suggest one song but make it different each time the prompt is called, so have a lot of options and select one.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyC_2lx6K_Ic8atbSm3OloqJWUieeVAvjp4"
  );

  const createStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      const star = {
        id: i,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 2 + 2,
      };
      stars.push(star);
    }
    return stars;
  };

  useEffect(() => {
    const starsContainer = document.getElementById("stars-container");
    const stars = createStars(200);

    stars.forEach((star) => {
      const starElement = document.createElement("div");
      starElement.className = "star";
      starElement.style.width = `${star.size}px`;
      starElement.style.height = `${star.size}px`;
      starElement.style.top = `${star.top}%`;
      starElement.style.left = `${star.left}%`;
      starElement.style.animationDuration = `${star.duration}s`;
      starsContainer.appendChild(starElement);
    });
  }, []);

  return (
    <>
      <div
        id="stars-container"
        className="min-h-screen p-0 pt-8 text-center relative w-full h-screen overflow-hidden bg-black z-1"
      >
        <div className="content-container">
          <h1 className="font-bold text-4xl pb-6 z-10 text-white pt-4 custom-font">
            Mood-driven melodies
          </h1>
          <form
            onSubmit={handleSubmit}
            className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4 mb-4"
          >
            <label htmlFor="input" className="header-font text-xl">
              Please enter a word to describe your mood.
            </label>
            <br></br>
            <input
              type="text"
              id="input"
              className="border-2 border-gray-200 my-6 rounded-md button-font"
              onChange={(e) => setMood(e.target.value)}
            ></input>
            <br></br>
            <button
              type="submit"
              className="bg-blue-800 rounded-xl p-2  shadow-lg text-white button-font z-20 hover:scale-110"
            >
              Load suggestion
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2 header-font">{errorMessage}</p>
            )}
          </form>
          <div className="z-20">
            <h2 className="custom-font text-xl mb-3 text-white">Song suggestions:</h2>
            <div className="border-2 border-gray-500 p-4 rounded-lg max-w-sm mx-auto z-20 bg-black">
              {!loading && (
                <Typing className="text-align-left text-white" text={apiData} />
              )}
              {loading && <p className="text-white">Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
