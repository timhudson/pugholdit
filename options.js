var _ = require('lodash')

var formatRegex = /.(png|gif|jpg|jpeg)$/
  , sizeRegex = /^\/(\d+)x?(\d+)*/

module.exports = function(req) {
  var formatMatch = req.url.match(formatRegex)
    , sizeMatch = req.url.match(sizeRegex)
    , options = {}

  if (formatMatch)
    options.format = formatMatch[1]
  
  if (sizeMatch)
    options.size = {
      width: sizeMatch[1],
      height: sizeMatch[2]
    }

  if (sizeMatch && !options.size.height)
    options.size.height = options.size.width

  return options
}