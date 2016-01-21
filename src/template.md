# Performance Audit

{url}

![Loaded screenshot]( {screenshot} )


## Page Load

### Test Setup
| Service | Browser | Date | Test Location | Connectivity | Latency |
|:------:|:-------:|:-----:|:-----:|:-----:|:-----:|
| {service} | {browser} v.{browserVersion} | {date} | {testLocation} | {connectivity} | {latency} |

### Test Results

#### Page Numbers
| First Byte (ms) | Start Render (ms) | DOM complete (ms) | DOM Elements | Loaded (ms) | No. Requests | Assets Size (kb) |
|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| {ttfb} | {render} | {dom} | {domCount} | {loaded} | {requests} | {size} |


#### Scores

| Page Speed Score | Speed Index* (ms) |
|:------:|:------:|
| {pagespeed} | {speedindex} |

_* Speed Index is the average time at which visible parts of the page are displayed_


## Optimisations

| Image Savings* (kb) | Gzip Savings (bytes) | Minify Savings (bytes) |
|:------:|:------:|:------:|
| {imageSaving} | {gzipSaving} | {minifySaving} |

_*Savings that could be made by converting `.jpeg` files to progressive 85 quality and stripping metadata from `.png` files._

### Request Breakdown
| Request | Number of Requests | Size (kb) |
|:------:|:------:|:------:|
| HTML | {htmlRequests} | {htmlSize} |
| CSS | {cssRequests} | {cssSize} |
| JS | {jsRequests} | {jsSize} |
| Image | {imageRequests} | {imageSize} |
| Font | {fontRequests} | {fontSize} |
| Text | {textRequests} | {textSize} |
| Flash | {flashRequests} | {flashSize} |
| Other | {otherRequests} | {otherSize} |
