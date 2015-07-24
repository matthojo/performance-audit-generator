# Performance Audit Generator

Generates a markdown Performance Audit based on the results from web page test services.

**Currently only works with SpeedCurve**
## Install

`npm install -g perf-audit`

## Usage

#### Available Options
  `-h`, `--help`          Displays instructions.

  `-o`, `--output `       Output path of the template. Defaults to stdout.

  `-s`, `--site `         The URL of the website being tested, or the site ID if using SpeedCurve.

  `-t`, `--testPlatform`  The platform you wish to get stats from. Options: SpeedCurve

  `-a`, `--apiKey `       The API key for your chosen platform.

### SpeedCurve Example

  Output to console;

  ```
    perf-audit -s [SpeedCurve Site ID] -t SpeedCurve -a [SpeedCurve API Key]
  ```

  Output to `.md` file on Desktop;
  ```
    perf-audit -s [SpeedCurve Site ID] -t SpeedCurve -a [SpeedCurve API Key] -o ~/Desktop/test.md
  ```
