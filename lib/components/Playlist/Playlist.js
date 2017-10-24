'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Playlist.css');

var _Tracklist = require('../Tracklist/Tracklist.js');

var _Tracklist2 = _interopRequireDefault(_Tracklist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playlist = function (_React$Component) {
  _inherits(Playlist, _React$Component);

  function Playlist(props) {
    _classCallCheck(this, Playlist);

    var _this = _possibleConstructorReturn(this, (Playlist.__proto__ || Object.getPrototypeOf(Playlist)).call(this, props));

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    return _this;
  }

  _createClass(Playlist, [{
    key: 'handleNameChange',
    value: function handleNameChange(event) {
      var newName = event.target.value;
      this.props.onNameChange(newName);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Playlist' },
        _react2.default.createElement('input', { defaultValue: 'New Playlist', onChange: this.handleNameChange }),
        _react2.default.createElement(_Tracklist2.default, { removalValue: true, tracks: this.props.playlistTracks, onRemove: this.props.onRemove }),
        _react2.default.createElement(
          'a',
          { className: 'Playlist-save', onClick: this.props.onSave },
          'SAVE TO SPOTIFY'
        )
      );
    }
  }]);

  return Playlist;
}(_react2.default.Component);

exports.default = Playlist;