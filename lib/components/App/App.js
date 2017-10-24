'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./App.css');

var _SearchBar = require('../SearchBar/SearchBar.js');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _SearchResults = require('../SearchResults/SearchResults.js');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _Playlist = require('../Playlist/Playlist.js');

var _Playlist2 = _interopRequireDefault(_Playlist);

var _Spotify = require('../../util/Spotify.js');

var _Spotify2 = _interopRequireDefault(_Spotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    _this.addTrack = _this.addTrack.bind(_this);
    _this.removeTrack = _this.removeTrack.bind(_this);
    _this.updatePlaylistName = _this.updatePlaylistName.bind(_this);
    _this.savePlaylist = _this.savePlaylist.bind(_this);
    _this.searchSpotify = _this.searchSpotify.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'searchSpotify',
    value: function searchSpotify(searchTerm) {
      var _this2 = this;

      _Spotify2.default.search(searchTerm).then(function (searchResults) {
        _this2.setState({
          searchResults: searchResults
        });
      });
    }
  }, {
    key: 'addTrack',
    value: function addTrack(track) {
      var inPlaylist = false;
      this.state.playlistTracks.forEach(function (trackObj) {
        if (trackObj.id === track.id) {
          inPlaylist = true;
        }
      });
      if (!inPlaylist) {
        var tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({ playlistTracks: tracks });
      }
    }
  }, {
    key: 'removeTrack',
    value: function removeTrack(track) {
      var tracks = this.state.playlistTracks;
      tracks = tracks.filter(function (currentTrack) {
        return currentTrack.id !== track.id;
      });

      this.setState({ playlistTracks: tracks });
    }
  }, {
    key: 'updatePlaylistName',
    value: function updatePlaylistName(newName) {
      this.setState({
        playlistName: newName
      });
    }
  }, {
    key: 'savePlaylist',
    value: function savePlaylist() {
      var trackURIs = [];
      this.state.playlistTracks.forEach(function (track) {
        trackURIs.push(track.uri);
      });
      _Spotify2.default.savePlaylist(this.state.playlistName, trackURIs);
      this.setState({
        playlistName: 'New Playlist',
        searchResults: []
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Ja',
          _react2.default.createElement(
            'span',
            { className: 'highlight' },
            'mmm'
          ),
          'ing'
        ),
        _react2.default.createElement(
          'div',
          { className: 'App' },
          _react2.default.createElement(_SearchBar2.default, { onSearch: this.searchSpotify }),
          _react2.default.createElement(
            'div',
            { className: 'App-playlist' },
            _react2.default.createElement(_SearchResults2.default, { searchResults: this.state.searchResults, onAdd: this.addTrack }),
            _react2.default.createElement(_Playlist2.default, { playlistName: this.state.playlistName, playlistTracks: this.state.playlistTracks, onRemove: this.removeTrack, onNameChange: this.updatePlaylistName, onSave: this.savePlaylist })
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;