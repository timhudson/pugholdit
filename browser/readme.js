/** @jsx React.DOM */
var React = require('react')
var readme = require('fs').readFileSync(__dirname + '/../static/README.html').toString()

module.exports = React.createClass({
  render: function() {
    return (
      <div dangerouslySetInnerHTML={{__html: readme}} />
    )
  }
})
