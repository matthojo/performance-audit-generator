module.exports = perfAudit

var request = require('request'),
    fs = require('fs'),
    async = require('async')

function perfAudit(opts, callback) {
  opts = opts || {}
  callback = callback || noop

  var values = {},
      md = ''

  async.series(
    [
      function(done){
        getVals(
          {
            site: opts.site,
            testPlatform: opts.testPlatform || '',
            apiKey: opts.apiKey || ''
          },
          function(err, vals) {
            if (err) throw err
            console.log('Values:', vals)
            values = vals
            done()
          }
        )
      },
      function(done){
        generate(values, function(err, template) {
          if (err) throw err
          md = template
          done()
        })
      }
    ],
    function(){
      callback(null, md)
    }
  )
}

function generate(vals, cb) {
  var template = fs.readFileSync(__dirname + '/src/template.md', 'utf8'),
      output = replaceKeys(template, vals)
  cb(null, output)
}

function getVals(opts, cb) {
  console.log('Getting values from ' + opts.testPlatform + '....')
  switch (opts.testPlatform) {
    case 'SpeedCurve':

      if(!opts.apiKey) {
        console.log('SpeedCurve needs and API key.')
        return process.exit(1)
      }

      var siteUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/urls/' + opts.site

      request({url: siteUrl}, function (err, response, body) {
        if (err) throw err
        var parsed = JSON.parse(body),
            testUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/tests/' + parsed.tests[parsed.tests.length - 1].test

        request({url: testUrl}, function (err, response, body) {
          if (err) throw err
          var parsedTest = JSON.parse(body),
              output = {
                device: 'SpeedCurve',
                screenshot: parsedTest.screen,
                url: parsedTest.url,
                day: parsedTest.day,
                browser: parsedTest.browser,
                browserVersion: parsedTest.browser_version,
                byte: parsedTest.byte,
                render: parsedTest.render,
                dom: parsedTest.dom,
                loaded: parsedTest.loaded,
                size: (parsedTest.size / 1000 ),
                requests: parsedTest.requests,
                pagespeed: parsedTest.pagespeed,
                speedindex: parsedTest.speedindex,
                imageSaving: (parsedTest.image_saving / 1000),
                htmlRequests: parsedTest.html_requests,
                htmlSize: (parsedTest.html_size / 1000),
                cssRequests: parsedTest.css_requests,
                cssSize: (parsedTest.css_size / 1000),
                jsRequests: parsedTest.js_requests,
                jsSize: (parsedTest.js_size / 1000),
                imageRequests: parsedTest.image_requests,
                imageSize: (parsedTest.image_size / 1000),
                fontRequests: parsedTest.font_requests,
                fontSize: (parsedTest.font_size / 1000),
                textRequests: parsedTest.text_requests,
                textSize: (parsedTest.text_size / 1000),
                flashRequests: parsedTest.flash_requests,
                flashSize: (parsedTest.flash_size / 1000),
                otherRequests: parsedTest.other_requests,
                otherSize: (parsedTest.other_size / 1000)
              }
          cb(null, output)
        })
      })

      break;
    default:
      cb(null, {})
  }
}

function replaceKeys(template, data) {
  var out = template
  data = data || {}
  Object.keys(data).forEach(function(key) {
    out = out.replace('{' + key + '}', data[key])
  })
  return out
}

function noop(){}
