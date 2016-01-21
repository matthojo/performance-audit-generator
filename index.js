module.exports = perfAudit

var fs = require('fs'),
    async = require('async')

function perfAudit (opts, callback) {
  opts = opts || {}
  callback = callback || noop

  var values = {},
      md = ''

  async.series(
    [
      function (done) {
        getVals(
          {
            site: opts.site,
            testPlatform: opts.testPlatform || '',
            apiKey: opts.apiKey || '',
            testID: opts.testID || '',
            timeout: opts.timeout || 120
          },
          function (err, vals) {
            if (err) throw err
            values = vals
            done()
          }
        )
      },
      function (done) {
        generate(values, function (err, template) {
          if (err) throw err
          md = template
          done()
        })
      }
    ],
    function () {
      callback(null, md)
    }
  )
}

function generate (vals, cb) {
  var template = fs.readFileSync(__dirname + '/src/template.md', 'utf8'),
      output = replaceKeys(template, vals)
  cb(null, output)
}

function getVals (opts, cb) {
  switch (opts.testPlatform) {
    case 'SpeedCurve':

      var speedC = require('./src/platforms/speedcurve')
      speedC(opts, function (err, vals) {
        if (err) throw err
        cb(null, vals)
      })
      break;
    case 'WebPageTest':
      var WPT = require('./src/platforms/webpagetest')
      WPT(opts, function (err, vals) {
        if (err) throw err
        cb(null, vals)
      })
      break;
    default:
      cb(null, {})
  }
}

function replaceKeys (template, data) {
  var out = template
  data = data || {}
  Object.keys(data).forEach(function (key) {
    out = out.replace('{' + key + '}', data[key])
  })
  return out
}

function noop () {}
