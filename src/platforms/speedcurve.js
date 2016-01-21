var request = require('request')

function speedCurve (opts, cb) {
  if (!opts.apiKey) {
    console.log('SpeedCurve needs and API key.')
    return process.exit(1)
  }

  var siteUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/urls/' + opts.site

  request({url: siteUrl}, function (err, response, body) {
    if (err) throw err

    // Get latest test, normally a mobile test. There is currently no way to distinguish between test viewports.
    var parsed = JSON.parse(body),
        testUrl = 'https://' + opts.apiKey + ':x@api.speedcurve.com/v1/tests/' + parsed.tests[0].test

    /* eslint complexity: 0 */
    request({url: testUrl}, function (err, response, body) {
      if (err) throw err
      /* eslint-disable camelcase */
      var parsedTest = JSON.parse(body),
          output = {
            service: 'SpeedCurve',
            screenshot: parsedTest.screen || 'Unavailable',
            url: parsedTest.url || 'Unavailable',
            date: parsedTest.day || 'Unavailable',
            testLocation: parsedTest.location || 'Unavailable',
            connectivity: parsedTest.connectivity || 'Unavailable',
            latency: parsedTest.latency + '' || 'Unavailable',
            browser: parsedTest.browser || 'Unavailable',
            browserVersion: parsedTest.browser_version || 'Unavailable',
            ttfb: ((parsedTest.byte / 1000) % 60) + '' || 'Unavailable',
            render: ((parsedTest.render / 1000) % 60) + '' || 'Unavailable',
            dom: ((parsedTest.dom / 1000) % 60) + '' || 'Unavailable',
            domCount: parsedTest.domElements || 'Unavailable',
            loaded: ((parsedTest.loaded / 1000) % 60) + '' || 'Unavailable',
            size: (parsedTest.size / 1000) + '' || 'Unavailable',
            requests: parsedTest.requests + '' || 'Unavailable',
            pagespeed: parsedTest.pagespeed + '' || 'Unavailable',
            speedindex: parsedTest.speedindex + '' || 'Unavailable',
            imageSaving: (parsedTest.image_saving / 1000) + '' || 'Unavailable',
            gzipSaving: (parsedTest.gzip_saving / 1000) || 'Unavailable',
            minifySaving: (parsedTest.minify_saving / 1000) || 'Unavailable',
            htmlRequests: parsedTest.html_requests + '' || 'Unavailable',
            htmlSize: (parsedTest.html_size / 1000) + '' || 'Unavailable',
            cssRequests: parsedTest.css_requests + '' || 'Unavailable',
            cssSize: (parsedTest.css_size / 1000) + '' || 'Unavailable',
            jsRequests: parsedTest.js_requests + '' || 'Unavailable',
            jsSize: (parsedTest.js_size / 1000) + '' || 'Unavailable',
            imageRequests: parsedTest.image_requests + '' || 'Unavailable',
            imageSize: (parsedTest.image_size / 1000) + '' || 'Unavailable',
            fontRequests: parsedTest.font_requests + '' || 'Unavailable',
            fontSize: (parsedTest.font_size / 1000) + '' || 'Unavailable',
            textRequests: parsedTest.text_requests + '' || 'Unavailable',
            textSize: (parsedTest.text_size / 1000) + '' || 'Unavailable',
            flashRequests: parsedTest.flash_requests + '' || 'Unavailable',
            flashSize: (parsedTest.flash_size / 1000) + '' || 'Unavailable',
            otherRequests: parsedTest.other_requests + '' || 'Unavailable',
            otherSize: (parsedTest.other_size / 1000) + '' || 'Unavailable'
          }
      /* eslint-enable camelcase */
      cb(null, output)
    })
  })
}

module.exports = speedCurve
