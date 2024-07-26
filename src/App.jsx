import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import TopTracks from "./components/pages/TopTracks";
import SpotifyLogin from "./components/pages/SpotifyLogin";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const expires_in = params.get("expires_in");
      const token_type = params.get("token_type");

      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
        setToken(access_token);
        window.location.hash = "";
      }
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/spotify-login" element={<SpotifyLogin />} />
        <Route path="/callback" element={<TopTracks token={token}/>} />
      </Routes>
    </Router>
  );
}

export default App;
