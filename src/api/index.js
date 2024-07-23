var client_id = '345a9f3ee851402587672859f0aca891';
var redirect_uri = 'http://localhost:8888/callback';
import express from "express";
import generateRandomString from "../lib";
import querystring from "query-string";

var app = express();

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

