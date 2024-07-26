import { useState, useEffect } from "react";
import "../../App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../../fonts.css";
// import Typing from "react-typing-effect";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
  const [mood, setMood] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [songData, setSongData] = useState(null);

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
    const prompt = `You are supposed to be a music expert who is in touch with many genres, so suggest a song that a person might like to listen to while they are ${mood}. Just provide the name of the song and the artist in the form song name artist. Suggest one song but make it different each time the prompt is called, so have a lot of options and select one.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    console.log(text);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://v1.nocodeapi.com/linaabuelezz/spotify/QMVsrAkPPvfyacwN/search?q=${text}&type=track&perPage=1&page=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const track = result.tracks.items[0];
        const songDetails = {
          name: track.name,
          artist: track.artists[0].name,
          albumCover: track.album.images[0].url,
          spotifyLink: track.external_urls.spotify,
        };
        setSongData(songDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
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
    const stars = createStars(300);

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

  const navigate = useNavigate();

  const handleTopTracksClick = () => {
    navigate("/spotify-login"); 
  };


  return (
    <>
      <div
        id="stars-container"
        className="min-h-screen p-0 pt-8 text-center relative w-full h-screen overflow-y-auto bg-black z-1"
      >
        <button
          onClick={handleTopTracksClick}
          className="absolute top-4 right-5 bg-blue-800 rounded-xl p-2 shadow-lg text-white button-font z-20 hover:scale-110"
        >
          View Your Top Artists & Tracks
          </button>
        <div className="content-container">
          <h1 className="font-bold text-4xl pb-6 z-10 text-white pt-4 custom-font">
            Mood-driven melodies
          </h1>
          <form
            onSubmit={handleSubmit}
            className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4 mb-4"
          >
            <label htmlFor="input" className="header-font text-xl">
              Please enter 1-3 words to describe your mood.
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
          <div className="z-20 mb-4">
            <h2 className="custom-font text-xl mb-3 text-white">Song suggestion:</h2>
            <div className="border-2 border-gray-500 p-4 rounded-lg max-w-sm mx-auto z-20 bg-black">
              {!loading && songData && (
                <Card>
                  <Card.Img src={songData.albumCover} alt="Album cover" />
                  <Card.Body>
                    <Card.Title className="text-black">{songData.name}</Card.Title>
                    <Card.Text className="text-black">{songData.artist}</Card.Text>
                    <Card.Link href={songData.spotifyLink} target="_blank" className="text-blue-500">
                      Listen on Spotify
                    </Card.Link>
                  </Card.Body>
                </Card>
              )}
              {loading && <p className="text-white text-xl custom-font">Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
