/** @jsx React.DOM */
var React = require('react')
var Images = require('./images')
var Readme = require('./readme')

React.renderComponent(
  <Readme />,
  document.getElementById('readme')
)

setTimeout(function() {
  React.renderComponent(
    <Images />,
    document.getElementById('images')
  )
}, 500)