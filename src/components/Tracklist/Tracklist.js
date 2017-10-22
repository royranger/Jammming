import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js';


class Tracklist extends React.Component {


  render() {

    return(
      <div className="Tracklist">
      {
        this.props.tracks.map(function(track) {
          return <p><Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/></p>;
        })
      }
      </div>

    );
  }
}

export default Tracklist;
