

const SpotifyLogin = () => {
  const clientId = '345a9f3ee851402587672859f0aca891';
  const redirectUri = encodeURIComponent('http://localhost:5173/callback');
  const scope = encodeURIComponent('user-read-currently-playing user-top-read');
  const responseType = 'code';

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default SpotifyLogin;
