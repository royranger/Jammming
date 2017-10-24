import React, { Component } from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }


  searchSpotify(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }


  addTrack(track) {
    let inPlaylist = false;
      this.state.playlistTracks.forEach(trackObj=> {
        if (trackObj.id === track.id ) {
          inPlaylist = true;
        }
      });
        if (!inPlaylist) {
          let tracks = this.state.playlistTracks;
          tracks.push(track);
          this.setState({playlistTracks: tracks});
        }
      }

  removeTrack(track) {
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

      this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }

  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.searchSpotify}/>
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
      </div>
    </div>
  </div>
    );
  }
}

export default App;
