# Performance Audit

{url}

![Loaded screenshot]( {screenshot} )


## Loading

### Test Setup
|Device | Browser | Date
|:------:|:-------:|:-----:|
|{device} | {browser} v.{browserVersion} | {day}

### Test Results

#### Page Numbers
|First Byte (ms) | Start Render (ms) | DOM complete (ms) | Loaded (ms) | No. Requests | Assets Size |
|:------:|:------:|:------:|:------:|:------:|:------:|
|{byte} | {render} | {dom} | {loaded} | {requests} | {size} kb |


#### Scores

| Page Speed Score | Speed Index* (ms) |
|:------:|:------:|
| {pagespeed} | {speedindex} |

_* Speed Index is the average time at which visible parts of the page are displayed_


## Optimisations

| Image Saving* |
|:------:|
| {imageSaving} kb |

_*Saving that could be made by converting Jpegs to progressive 85 quality and stripping metadata from PNG’s_

### Request Breakdown
| HTML Requests | HTML Size |
|:------:|:------:|
| {htmlRequests} | {htmlSize} kb |

| CSS Requests | CSS Size |
|:------:|:------:|
| {cssRequests} | {cssSize} kb |

| JS Requests | JS Size |
|:------:|:------:|
| {jsRequests} | {jsSize} kb |

| Image Requests | Image Size |
|:------:|:------:|
| {imageRequests} | {imageSize} kb |

| Font Requests | Font Size |
|:------:|:------:|
| {fontRequests} | {fontSize} kb |

| Text Requests | Text Size |
|:------:|:------:|
| {textRequests} | {textSize} kb |

| Flash Requests | Flash Size |
|:------:|:------:|
| {flashRequests} | {flashSize} kb |

| Other Requests | Other Size |
|:------:|:------:|
| {otherRequests} | {otherSize} kb |
