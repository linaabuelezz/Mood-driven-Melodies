import { useEffect } from "react";

const CLIENT_ID = "345a9f3ee851402587672859f0aca891";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/callback";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-top-read",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const SpotifyLogin = () => {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

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

  return (
    <div
      id="stars-container"
      className="min-h-screen p-0 pt-8 text-center relative w-full h-screen overflow-y-auto bg-black z-1"
    >
      <div className="content-container">
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-800 rounded-xl p-2 shadow-lg text-white button-font z-20 hover:scale-110"
        >
          Login to Spotify
        </button>
      </div>
    </div>
  );
};

export default SpotifyLogin;
