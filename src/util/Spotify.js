let accessToken;
const clientId = '50c5ad47228642c58766436fb6b49163';
const clientSecret = 'd8fda74a11984992af003eff5da48a18';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

  // Get a Spotify user's access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },


  // Use the access token, send a search request to the Spotify API
  search: (searchTerm) => {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }

    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },


  // Save the user's created playlist to their Spotify account

  savePlaylist: (playlistName, trackURIs) => {
    if ((!playlistName) || (!trackURIs)) {
      return;
    }
    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userID;
    let playlistID;

    // Gets user id
    const getUserId = () => {
      return fetch('https://api.spotify.com/v1/me', {
        headers: headers
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userID = jsonResponse.id;
      })
    };

    // Creates a new playlist in account
    const createNewPlaylist = () => {
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
    };

    // Adds tracks to playlist
    const addTracksToPlaylist = () => {
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
      })
    };

    return (getUserId().then(createNewPlaylist).then(addTracksToPlaylist));

  }
};

export default Spotify;
