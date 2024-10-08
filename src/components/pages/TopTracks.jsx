import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

const TopTracks = ({ token }) => {
  const [data, setData] = useState({});
  const [artistData, setArtistData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const starsContainerRef = useRef(null);

  const handleGetTopTracks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(TRACKS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
      setArtistData("");
      console.log(data);
    } catch (error) {
      setError("Failed to fetch top tracks.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTopArtists = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(ARTISTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setArtistData(response.data);
      setData("");
      console.log(artistData);
    } catch (error) {
      setError("Failed to fetch top artists.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    const starsContainer = starsContainerRef.current;
    if (starsContainer) {
      const stars = createStars(600);

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
    }
  }, []);

  return (
    <div
      ref={starsContainerRef}
      id="stars-container"
      className="min-h-screen p-0 pt-8 text-center relative w-full h-screen overflow-y-auto bg-black z-1"
    >
      <div className="content-container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center mb-4 mt-4">
          <button
            onClick={handleGetTopTracks}
            className="mb-4 sm:mb-0 sm:mr-4 bg-blue-800 rounded-xl p-2 shadow-lg text-white button-font z-20 hover:scale-110"
          >
            Get Top Tracks
          </button>
          <button
            onClick={handleGetTopArtists}
            className="mb-4 sm:mb-0 sm:mr-4 bg-blue-800 rounded-xl p-2 shadow-lg text-white button-font z-20 hover:scale-110"
          >
            Get Top Artists
          </button>
        </div>

        {loading && <p className="text-white text-lg">Loading...</p>}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {artistData?.items && (
          <div>
            {artistData.items.map((artist, key) => (
              <div key={key} className="flex flex-col sm:flex-row items-center my-4">
                {artist.images[0]?.url && (
                  <img
                    src={artist.images[0].url}
                    alt={`${artist.name} cover`}
                    className="w-16 h-16 object-cover mb-2 sm:mb-0 sm:mr-4"
                  />
                )}
                <div className="flex-1 text-left">
                  <p className="text-white font-bold text-base sm:text-lg">{key + 1}. {artist.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.items && (
          <div>
            {data.items.map((item, key) => (
              <div key={key} className="flex flex-col sm:flex-row items-center my-4">
                {item.album.images[0]?.url && (
                  <img
                    src={item.album.images[0].url}
                    alt={`${item.name} cover`}
                    className="w-16 h-16 object-cover mb-2 sm:mb-0 sm:mr-4"
                  />
                )}
                <div className="flex-1 text-left">
                  <p className="text-white font-bold text-base sm:text-lg">{key + 1}. {item.name}</p>
                  <p className="text-gray-400 text-sm sm:text-base">{item.artists[0].name}</p>
                </div>
                <div className="ml-0 sm:ml-4 mt-2 sm:mt-0">
                  {item.preview_url ? (
                    <audio controls className="w-full sm:w-48">
                      <source src={item.preview_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p className="text-gray-500">Audio not available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TopTracks.propTypes = {
  token: PropTypes.string.isRequired,
};

export default TopTracks;
