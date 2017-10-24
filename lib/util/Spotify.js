'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var accessToken = void 0;
var clientId = '50c5ad47228642c58766436fb6b49163';
var clientSecret = 'd8fda74a11984992af003eff5da48a18';
var redirectURI = 'http://joyjammming.surge.sh/';

var Spotify = {

  // Get a Spotify user's access token
  getAccessToken: function getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    var accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    var expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      var expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(function () {
        return accessToken = '';
      }, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      var accessUrl = 'https://accounts.spotify.com/authorize?client_id=' + clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + redirectURI;
      window.location = accessUrl;
    }
  },


  // Use the access token, send a search request to the Spotify API
  search: function search(searchTerm) {
    var accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/search?type=track&q=' + searchTerm, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }

    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(function (track) {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      });
    });
  },

  // Save the user's created playlist to their Spotify account

  savePlaylist: function savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }
    accessToken = Spotify.getAccessToken();
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };
    var userID = void 0;
    var playlistID = void 0;

    // Gets user id
    var getUserId = function getUserId() {
      return fetch('https://api.spotify.com/v1/me', {
        headers: headers
      }).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        userID = jsonResponse.id;
      });
    };

    // Creates a new playlist in account
    var createNewPlaylist = function createNewPlaylist() {
      return fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
        })
      }).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        playlistID = jsonResponse.id;
      });
    };

    // Adds tracks to playlist
    var addTracksToPlaylist = function addTracksToPlaylist() {
      return fetch('https://api.spotify.com/v1/users/' + userID + '/playlists/' + playlistID + '/tracks', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          uris: trackURIs
        })
      }).then(function (response) {
        return response.json();
      }).then(function (jsonResponse) {
        playlistID = jsonResponse.id;
      });
    };

    return getUserId().then(createNewPlaylist).then(addTracksToPlaylist);
  }
};

exports.default = Spotify;