var request = require('request'),
    chalk = require('chalk'),
    WebPageTest = require('webpagetest')

function webPageTest(opts, cb) {
  if(!opts.apiKey) {
    console.log('WebPageTest needs and API key.')
    return process.exit(1)
  }

  if(opts.site) {
    newTest(opts, cb)
  } else if (opts.testID) {
    getResults(opts, cb)
  }
}

function newTest(opts, cb) {
  var timeout = opts.timeout
  console.log(chalk.blue('Obtaining WebPageTest results, timeout is in ' + timeout + ' seconds'))

  var startTime = new Date().getTime()
    , wpt = new WebPageTest('www.webpagetest.org', opts.apiKey)
  wpt.runTest(opts.site, {pollResults: 5, timeout: timeout}, function(err, data) {
    if (err) throw err
    console.log(chalk.green('WebPageTest Test ID:', data.data.id))
    var parsedTest = data.data,
        output = {
          device: 'WebPageTest',
          screenshot: decodeURI(parsedTest.runs['1'].firstView.images.screenshot),
          url: parsedTest.url,
          day: 'Unavailable',
          testLocation: parsedTest.location,
          browser: parsedTest.runs['1'].firstView.browser_name,
          browserVersion: parsedTest.runs['1'].firstView.browser_version,
          byte: parsedTest.median.firstView.TTFB,
          render: parsedTest.median.firstView.render,
          dom: parsedTest.median.firstView.docTime,
          loaded: parsedTest.median.firstView.domContentLoadedEventEnd,
          size: 'Unavailable',
          requests: parsedTest.median.firstView.requests.length,
          pagespeed: 'Unavailable',
          speedindex: parsedTest.median.firstView.SpeedIndex,
          imageSaving: (parsedTest.median.firstView.image_saving / 1000),
          htmlRequests: parsedTest.runs['1'].firstView.breakdown.html.requests,
          htmlSize: (parsedTest.runs['1'].firstView.breakdown.html.bytes / 1000),
          cssRequests: parsedTest.runs['1'].firstView.breakdown.css.requests,
          cssSize: (parsedTest.runs['1'].firstView.breakdown.css.bytes / 1000),
          jsRequests: parsedTest.runs['1'].firstView.breakdown.js.requests,
          jsSize: (parsedTest.runs['1'].firstView.breakdown.js.bytes / 1000),
          imageRequests: parsedTest.runs['1'].firstView.breakdown.image.requests,
          imageSize: (parsedTest.runs['1'].firstView.breakdown.image.bytes / 1000),
          fontRequests: parsedTest.runs['1'].firstView.breakdown.font.requests,
          fontSize: (parsedTest.runs['1'].firstView.breakdown.font.bytes / 1000),
          textRequests: 'Unavailable',
          textSize: 'Unavailable',
          flashRequests: parsedTest.runs['1'].firstView.breakdown.flash.requests,
          flashSize: (parsedTest.runs['1'].firstView.breakdown.flash.bytes / 1000),
          otherRequests: parsedTest.runs['1'].firstView.breakdown.other.requests,
          otherSize: (parsedTest.runs['1'].firstView.breakdown.other.bytes / 1000)
        }
    var timeTaken = ((new Date().getTime() - startTime) / 1000) %60
    console.log(chalk.green('Time taken: ' + timeTaken))
    cb(null, output)
  })
}

function getResults(opts, cb) {
  console.log(chalk.blue('Obtaining existing WebPageTest results'))

  var startTime = new Date().getTime()
    , wpt = new WebPageTest('www.webpagetest.org', opts.apiKey)
  wpt.getTestResults(opts.testID, function(err, data) {
    if (err) throw err
    console.log(chalk.green('WebPageTest Test ID:', data.data.id))
    var parsedTest = data.data,
        output = {
          device: 'WebPageTest',
          screenshot: decodeURI(parsedTest.runs['1'].firstView.images.screenshot),
          url: parsedTest.url,
          day: 'Unavailable',
          testLocation: parsedTest.location,
          browser: parsedTest.runs['1'].firstView.browser_name,
          browserVersion: parsedTest.runs['1'].firstView.browser_version,
          byte: parsedTest.median.firstView.TTFB,
          render: parsedTest.median.firstView.render,
          dom: parsedTest.median.firstView.docTime,
          loaded: parsedTest.median.firstView.domContentLoadedEventEnd,
          size: 'Unavailable',
          requests: parsedTest.median.firstView.requests.length,
          pagespeed: 'Unavailable',
          speedindex: parsedTest.median.firstView.SpeedIndex,
          imageSaving: (parsedTest.median.firstView.image_saving / 1000),
          htmlRequests: parsedTest.runs['1'].firstView.breakdown.html.requests,
          htmlSize: (parsedTest.runs['1'].firstView.breakdown.html.bytes / 1000),
          cssRequests: parsedTest.runs['1'].firstView.breakdown.css.requests,
          cssSize: (parsedTest.runs['1'].firstView.breakdown.css.bytes / 1000),
          jsRequests: parsedTest.runs['1'].firstView.breakdown.js.requests,
          jsSize: (parsedTest.runs['1'].firstView.breakdown.js.bytes / 1000),
          imageRequests: parsedTest.runs['1'].firstView.breakdown.image.requests,
          imageSize: (parsedTest.runs['1'].firstView.breakdown.image.bytes / 1000),
          fontRequests: parsedTest.runs['1'].firstView.breakdown.font.requests,
          fontSize: (parsedTest.runs['1'].firstView.breakdown.font.bytes / 1000),
          textRequests: 'Unavailable',
          textSize: 'Unavailable',
          flashRequests: parsedTest.runs['1'].firstView.breakdown.flash.requests,
          flashSize: (parsedTest.runs['1'].firstView.breakdown.flash.bytes / 1000),
          otherRequests: parsedTest.runs['1'].firstView.breakdown.other.requests,
          otherSize: (parsedTest.runs['1'].firstView.breakdown.other.bytes / 1000)
        }
    var timeTaken = ((new Date().getTime() - startTime) / 1000) %60
    console.log(chalk.green('Time taken: ' + timeTaken))
    cb(null, output)
  })
}

module.exports = webPageTest
