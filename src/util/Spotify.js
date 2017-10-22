let accessToken;
const clientId = '50c5ad47228642c58766436fb6b49163';
const clientSecret = 'd8fda74a11984992af003eff5da48a18';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

  // Get a Spotify user's access token
  getAccessToken: () => {
    const url = window.location.href;

    if (accessToken) {
      return accessToken;
    }
    else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
      accessToken = (url.match(/access_token=([^&]*)/))[0].slice(13);
      let expirationTime = (url.match(/expires_in=([^&]*)/))[0].slice(11);
      window.setTimeout(() => accessToken = '', expirationTime * expirationTime);
      window.history.pushState('Access Token', null, '/');
    }
    else {
      window.location('https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI);
    }
  },

  // Use the access token, send a search request to the Spotify API
  search: (searchTerm) => {
    return (
      this.getAccessToken().then(() => {
        return (
          fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        ).then(response => {
          return response.json();
        }).then(jsonResponse => {
          console.log(jsonResponse);
          if (jsonResponse.track) {
            return jsonResponse.track.map(track => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }
            });
          }
        })
      })
    );
  },

  // Save the user's created playlist to their Spotify account

  savePlaylist: (playlistName, trackURIs) => {
    if ((!playlistName) || (!trackURIs)) {
      return;
    }
    accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    let playlistID;

    // Gets user id
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userID = jsonResponse.id;
    })

    // Creates a new playlist in account
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        name: playlistName
      })
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
    })

    // Adds tracks to playlist
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        uris: trackURIs
      })
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
    });
  }
};

export default Spotify;
