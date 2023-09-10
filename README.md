# hibp-cli
A simple Node CLI tool to extract the accounts involved a data breach using the *have i been pwned?* [API](https://haveibeenpwned.com/API/v3)

## Installation
Create the config.js file
```javascript
const config = {
    hibp: {
        token: 'your-hibp-api-token',
        url: 'https://haveibeenpwned.com/api/v3',
        domains: ['domain.com.au','sub.domain.com.au']
    }
};
module.exports = config;
```

```shell
# Install required libraries
$ npm install
```
## Usage
```shell
# Get accounts involved in the latest data breach
$ node app.js

# Get accounts involved in a specified data breach
$ node app.js --breach=Canva
```