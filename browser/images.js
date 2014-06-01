/** @jsx React.DOM */
var React = require('react')
var Image = require('./components/image')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      count: 21
    }
  },
  render: function() {
    var images = []
    var aspectRatio = window.innerWidth / window.innerHeight
    var width, height

    while (images.length < 21) {
      width = 480 + images.length
      height = Math.round(width / aspectRatio)

      images.push(
        <div className="image-container">
          <Image src={'/' + width + 'x' + height + '.jpg'} aspectRatio={aspectRatio} />
        </div>
      )
    }

    return <div className="group">{images}</div>
  }
})
