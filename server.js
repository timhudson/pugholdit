var http = require('http')
  , request = require('request')
  , gm = require('gm')
  , options = require('./options')

var server = http.createServer(function(req, res) {
  var opts = options(req)

  if (!opts.size) return res.end('pughold.it')

  request({
    uri: 'http://pugme.herokuapp.com/random',
    json: true
  },
  function(err, response, body) {
    if (err || !body.pug) return res.end('oops, no pugs this time')

    gm(request(body.pug))
      .resize(opts.size.width, opts.size.height, '^')
      .gravity('Center')
      .crop(opts.size.width, opts.size.height)
      .setFormat(opts.format)
      .stream()
      .pipe(res)
  })
})

server.listen(process.env.PORT || 1515)
