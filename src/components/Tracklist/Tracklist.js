import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.js';


class Tracklist extends React.Component {


  render() {

    return(
      <div className="Tracklist">
      {
        this.props.tracks.map(track => {
          return <Track key={track.id} track={track} isRemoval={this.props.removalValue} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>;
        })
      }
      </div>

    );
  }
}

export default Tracklist;
