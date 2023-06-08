const React = require('react');
const ReactDOM = require('react-dom/client');

const WordRelay = require('./WordRelay'); // WordRelay를 불러옴


ReactDOM.createRoot(document.querySelector('#root')).render(<WordRelay />);