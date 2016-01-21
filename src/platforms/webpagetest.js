var chalk = require('chalk'),
    ProgressBar = require('progress'),
    WebPageTest = require('webpagetest')

function webPageTest (opts, cb) {
  if (!opts.apiKey) {
    console.log('WebPageTest needs and API key.')
    return process.exit(1)
  }

  if (opts.site) {
    newTest(opts, function (err, parsedTest) {
      if (err) throw err
      finishedTest(parsedTest, cb)
    })
  } else if (opts.testID) {
    getResults(opts, function (err, parsedTest) {
      if (err) throw err
      finishedTest(parsedTest, cb)
    })
  }
}
/*eslint complexity: 0*/
function finishedTest (parsedTest, cb) {
  var output = {
    service: 'WebPageTest',
    screenshot: decodeURI(parsedTest.runs['1'].firstView.images.screenShot) || 'Unavailable',
    url: parsedTest.url || 'Unavailable',
    date: convertTimestamp(parsedTest.completed) || 'Unavailable',
    testLocation: parsedTest.location || 'Unavailable',
    connectivity: parsedTest.connectivity || 'Unavailable',
    latency: parsedTest.latency + '' || 'Unavailable',
    browser: parsedTest.runs['1'].firstView.browser_name || 'Unavailable',
    browserVersion: parsedTest.runs['1'].firstView.browser_version || 'Unavailable',
    ttfb: parsedTest.median.firstView.TTFB + '' || 'Unavailable',
    render: parsedTest.median.firstView.render + '' || 'Unavailable',
    dom: parsedTest.median.firstView.docTime + '' || 'Unavailable',
    domCount: parsedTest.median.firstView.domElements + '' || 'Unavailable',
    loaded: parsedTest.median.firstView.domContentLoadedEventEnd + '' || 'Unavailable',
    size: 'Unavailable',
    requests: parsedTest.median.firstView.requests.length + '' || 'Unavailable',
    pagespeed: parsedTest.median.firstView.PageSpeed || 'Unavailable',
    speedindex: parsedTest.median.firstView.SpeedIndex + '' || 'Unavailable',
    imageSaving: (parsedTest.median.firstView.image_savings / 1000) + '' || 'Unavailable',
    gzipSaving: (parsedTest.median.firstView.gzip_savings) + '' || 'Unavailable',
    minifySaving: (parsedTest.median.firstView.minify_savings) + '' || 'Unavailable',
    htmlRequests: parsedTest.runs['1'].firstView.breakdown.html.requests + '' || 'Unavailable',
    htmlSize: (parsedTest.runs['1'].firstView.breakdown.html.bytes / 1000) + '' || 'Unavailable',
    cssRequests: parsedTest.runs['1'].firstView.breakdown.css.requests + '' || 'Unavailable',
    cssSize: (parsedTest.runs['1'].firstView.breakdown.css.bytes / 1000) + '' || 'Unavailable',
    jsRequests: parsedTest.runs['1'].firstView.breakdown.js.requests + '' || 'Unavailable',
    jsSize: (parsedTest.runs['1'].firstView.breakdown.js.bytes / 1000) + '' || 'Unavailable',
    imageRequests: parsedTest.runs['1'].firstView.breakdown.image.requests + '' || 'Unavailable',
    imageSize: (parsedTest.runs['1'].firstView.breakdown.image.bytes / 1000) + '' || 'Unavailable',
    fontRequests: parsedTest.runs['1'].firstView.breakdown.font.requests + '' || 'Unavailable',
    fontSize: (parsedTest.runs['1'].firstView.breakdown.font.bytes / 1000) + '' || 'Unavailable',
    textRequests: 'Unavailable',
    textSize: 'Unavailable',
    flashRequests: parsedTest.runs['1'].firstView.breakdown.flash.requests + '' || 'Unavailable',
    flashSize: (parsedTest.runs['1'].firstView.breakdown.flash.bytes / 1000) + '' || 'Unavailable',
    otherRequests: parsedTest.runs['1'].firstView.breakdown.other.requests + '' || 'Unavailable',
    otherSize: (parsedTest.runs['1'].firstView.breakdown.other.bytes / 1000) + '' || 'Unavailable'
  }

  cb(null, output)
}

function newTest (opts, cb) {
  console.log(chalk.blue('Obtaining WebPageTest results, timeout is in ' + opts.timeout + ' seconds'))
  var wpt = new WebPageTest('www.webpagetest.org', opts.apiKey),
      bar = new ProgressBar(chalk.blue('[:bar] :elapsed'), { total: opts.timeout * 10, width: 40, clear: true }),
      timer = setInterval(function () {
        bar.tick()
        if (bar.complete) {
          clearInterval(timer)
        }
      }, 100)
  wpt.runTest(opts.site, { pollResults: 5, timeout: opts.timeout, pageSpeed: true }, function (err, data) {
    if (err) {
      if (err.error.code === 'TIMEOUT') {
        console.log(chalk.red('\nTimeout reached :('))
        return process.exit(1)
      }

      throw err
    }
    if (data.statusCode !== 200) {
      console.log(chalk.red('Error: ' + data.statusText))
      return process.exit(1)
    }
    console.log(chalk.green('\nWebPageTest Test ID:', data.data.id))
    bar.tick(opts.timeout * 10)
    cb(null, data.data)
  })
}

function getResults (opts, cb) {
  console.log(chalk.blue('Obtaining existing WebPageTest results'))

  var wpt = new WebPageTest('www.webpagetest.org', opts.apiKey)
  wpt.getTestResults(opts.testID, function (err, data) {
    if (err) throw err
    if (data.statusCode !== 200) {
      console.log(chalk.red('Error: ' + data.statusText))
      return process.exit(1)
    }
    console.log(chalk.green('WebPageTest Test ID:', data.data.id))
    cb(null, data.data)
  })
}

function convertTimestamp (timestamp) {
  var d = new Date(timestamp * 1000), // Convert to milliseconds
    yyyy = d.getFullYear(),
    mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
    dd = ('0' + d.getDate()).slice(-2),     // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ('0' + d.getMinutes()).slice(-2),   // Add leading 0.
    ampm = 'AM',
    time

  if (hh >= 12) {
    h = hh - 12
    ampm = 'PM'
  } else if (hh === 0) {
    h = 12
  }

  time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm

  return time
}

module.exports = webPageTest
