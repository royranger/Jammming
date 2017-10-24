import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.js';


class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const newName = event.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <Tracklist removalValue={true} tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>

    );
  }
}

export default Playlist;
