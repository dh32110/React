const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay'); // WordRelay를 불러옴


ReactDom.render(<WordRelay />, document.querySelector('#root'))