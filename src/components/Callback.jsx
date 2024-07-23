import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      console.log('Authorization code:', code);
      exchangeCodeForToken(code);
    }
  }, [location]);

  const exchangeCodeForToken = async (code) => {
    const clientId = '345a9f3ee851402587672859f0aca891'; // Your actual client ID
    const clientSecret = '03beadeb4205411f881e52a1c355c0d5'; // Your actual client secret
    const redirectUri = 'http://localhost:5173/callback'; // This should match exactly what you have registered
  
    // Base64 encode client ID and client secret
    const authHeader = btoa(`${clientId}:${clientSecret}`);
    
    // Create URLSearchParams object which handles encoding
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri); // Use the unencoded URI if it matches your registered URI
  
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', params, {
        headers: {
          'Authorization': `Basic ${authHeader}`, // Basic Auth header
          'Content-Type': 'application/x-www-form-urlencoded' // Content type required by Spotify
        }
      });
  
      const { access_token, refresh_token } = response.data;
      console.log('Access token:', access_token);
      console.log('Refresh token:', refresh_token);
      // Store tokens securely (e.g., local storage, context, etc.)
    } catch (error) {
      console.error('Error exchanging token:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <h1>Callback</h1>
      <p>Processing your request...</p>
    </div>
  );
};

export default Callback;

