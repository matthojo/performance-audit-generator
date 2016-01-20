var request = require('request')

function speedCurve(opts, cb) {
  if(!opts.apiKey) {
    console.log('SpeedCurve needs and API key.')
    return process.exit(1)
  }

  var siteUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/urls/' + opts.site

  request({url: siteUrl}, function (err, response, body) {
    if (err) throw err

    // Get latest test, normally a mobile test. There is currently no way to distinguish between test viewports.
    var parsed = JSON.parse(body),
        testUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/tests/' + parsed.tests[0].test

    request({url: testUrl}, function (err, response, body) {
      if (err) throw err
      var parsedTest = JSON.parse(body),
          output = {
            device: 'SpeedCurve',
            screenshot: parsedTest.screen,
            url: parsedTest.url,
            day: parsedTest.day,
            testLocation: parsedTest.location,
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
}

module.exports = speedCurve
