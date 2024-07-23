import Homepage from "./components/pages/Homepage";
import Callback from "./components/Callback";
import SpotifyLogin from "./components/pages/SpotifyLogin";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyLogin />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
    // <Homepage />
  )
}

export default App;