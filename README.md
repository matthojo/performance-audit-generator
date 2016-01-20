# Performance Audit Generator

Generates a markdown Performance Audit based on the results from web page test services.

## Install

`npm install -g perf-audit`

## Usage

#### Available Options
  `-h`, `--help`          Displays instructions.

  `-o`, `--output `       Output path of the template. Defaults to stdout.

  `-s`, `--site `         The URL of the website being tested, or the site ID if using SpeedCurve.

  `-t`, `--testPlatform`  The platform you wish to get stats from. Options: SpeedCurve, WebPageTest

  `-a`, `--apiKey `       The API key for your chosen platform.

  `to`, `--timeout`  Set the timeout of WebPageTest results requests.

  `i`, `--testID` Request results for a specific WebPageTest test.

### SpeedCurve Example

  Output to console;

  ```
    perf-audit -s <Site ID> -t SpeedCurve -a <API Key>
  ```

  Output to `.md` file on Desktop;
  ```
    perf-audit -s <Site ID> -t SpeedCurve -a <API Key> -o ~/Desktop/test.md
  ```

### WebPageTest Example
  You will need an API key which is available from <http://www.webpagetest.org/getkey.php>.

  Output to console;

  ```
    perf-audit -s <URL> -t WebPageTest -a <API Key>
  ```

  Output to `.md` file on Desktop;
  ```
    perf-audit -s <URL> -t WebPageTest -a <API Key> -o ~/Desktop/test.md
  ```

  Custom Timeout (default: 120) for WebPageTest results request;

  ```
    perf-audit -s <URL> -t WebPageTest -a <API Key> -to <seconds>
  ```

  Generate report from existing WebPageTest results;

  ```
    perf-audit -s <URL> -t WebPageTest -a <API Key> -i <test ID>
  ```
