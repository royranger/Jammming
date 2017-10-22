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
      searchResults: [
      {
        name: '15' ,
        artist: 'Taylor Swift' ,
        album: '1989'
      },
      {
        name: 'Soledad',
        artist: 'Westlife',
        album: 'Coast to Coast'
      }],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          id: 1,
          name: 'Dirrty',
          artist: 'Christina Aguilera',
          album: 'Stripped'
        },
        {
          id: 2,
          name: 'Lune',
          artist: 'Bruno Pelletier',
          album: 'Notre Dame de Paris'
        }
      ]
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
    if (track.id === this.state.playlistTracks.id) {
      return;
    }
    else {
      let newPlaylist = this.state.playlistTracks.push(track);
      this.setState ({playlistTracks: newPlaylist});
    }
  }

  removeTrack(track) {
      let newPlaylist = this.state.playlistTracks.filter(function(track) {
        return (track.id != this.state.playlistTracks.id);
      });
      this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks.uri);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
    /* Old code
    let trackURIs = [];
    this.state.playlistTracks.forEach(function(track) {
      trackURIs.push(track.uri);
    });
    */
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
