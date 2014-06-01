var _ = require('lodash')
  , util = require('util')
  , request = require('request')
  , pick = require('deck').pick

var cache = []

var client_id = process.env.INSTAGRAM_CLIENT_ID
var url = 'https://api.instagram.com/v1/users/%s/media/recent?client_id=' + client_id + '&count=33'

module.exports.getLength = function() {
  return cache.length
}

module.exports.random = function() {
  return pick(cache)
}

module.exports.populate = function(user, callback) {
  var tempCache = []

  eachPage(util.format(url, user), function(json) {
    if (!json.data) return

    var urls = json.data.map(function(item) {
      return item.images.standard_resolution.url
    })

    tempCache = tempCache.concat(urls)
  }, function(err) {
    if (err) return callback(err)

    cache = _.uniq(cache.concat(tempCache))

    callback()
  })
}

function eachPage(url, iterator, callback) {
  request({url: url, json: true}, function(err, res, body) {
    if (err) return callback(err)

    iterator(body)

    if (body.pagination && (url = body.pagination.next_url)) {
      eachPage(url, iterator, callback)
    } else {
      callback()
    }
  })
}
