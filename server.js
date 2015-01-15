var http = require('http')
  , async = require('async')
  , moment = require('moment')
  , request = require('request')
  , GA = require('ga')
  , gm = require('gm')
  , options = require('./options')
  , instagramer = require('./instagramer')

var ga = new GA(process.env.GA_TRACKING_CODE, process.env.GA_HOST)

var staticd = require('ecstatic')({
  root: __dirname + '/static',
  showDir: false,
  autoIndex: true,
  defaultExt: 'html',
  gzip: true
})

var placeholder = require('fs').readFileSync('./ben.jpg')

var PORT = process.env.PORT || 1515

var server = http.createServer(function(req, res) {
  var opts = options(req)
    , url = instagramer.random()
    , source = url ? request(url) : placeholder

  if (!opts.size) return staticd(req, res)

  gm(source)
    .resize(opts.size.width, opts.size.height, '^')
    .gravity('Center')
    .crop(opts.size.width, opts.size.height)
    .setFormat(opts.format)
    .stream()
    .pipe(res)

  ga.trackPage(req.url.replace(/\?.+/, ''))
})

function populate(callback) {
  console.log('Loading instagram urls ...')

  var start = Date.now()
  var users = [
    '716811', // @pugs
    '14834896', // @pugstagram
    '10781872' // @pugsofinstagram
  ]

  async.each(users, instagramer.populate, function(err) {
    if (err) console.error(err)

    console.log('%d loaded in %s', instagramer.getLength(), moment.duration(Date.now() - start).humanize())

    if (callback) callback()
  })
}

populate()
setInterval(populate, 5 * 60 * 1000)

server.listen(PORT, function() {
  console.log('pugholdit now listening on %d', PORT)
})