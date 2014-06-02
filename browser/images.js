/** @jsx React.DOM */
var React = require('react')
var Image = require('./components/image')
var crypto = require('crypto')

module.exports = React.createClass({
  getInitialState: function() {
    var count = 21
    var images = []
    var aspectRatio = window.innerWidth / window.innerHeight
    var width = 480
    var height = Math.round(width / aspectRatio)

    while (images.length < 21) {
      images.push('/' + width + 'x' + height + '.jpg?s=' + crypto.randomBytes(5).toString('hex'))
    }

    return {
      images: images,
      aspectRatio: aspectRatio
    }
  },
  render: function() {
    var self = this

    var images = this.state.images.map(function(image) {
      return (
        <div className="image-container">
          <Image src={image} aspectRatio={self.state.aspectRatio} />
        </div>
      )
    })

    return <div className="group">{images}</div>
  }
})
