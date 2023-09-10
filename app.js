const config = require('./config')
const c = require('ansi-colors')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const axios = require('axios')
const options = {
    headers: {'hibp-api-key': config.hibp.token },
    responseType: 'json'
}

async function main() {
    try {
        // get the latest data breach or passed from args
        var breach = ''
        if (argv.breach) {
            // get a single breached site by name
            const response = await axios.get(config.hibp.url + '/breach/' + argv.breach)
            console.log(response.data)
            breach = response.data.Name
        } else {
            // get the latest data breach
            const response = await axios.get(config.hibp.url + '/latestbreach')
            console.log(response.data)
            breach = response.data.Name
        }
        
        // search domains for the latest data breach
        for(const domain of config.hibp.domains){
            console.log(c.red(domain.toUpperCase()))
            const breachedEmails = []
            try {
                const res = await axios.get(config.hibp.url + '/breacheddomain/' + domain, options)

                // convert object to an array
                const emails = Object.entries(res.data);
                for(const [email, breachNames] of emails){
                    // search for emails that are involved in the latest breach
                    if(`${breachNames}`.includes(breach)){
                        console.log(`${email}` + '@' + domain)
                        breachedEmails.push(`${email}` + '@' + domain)
                    }                    
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    } catch (error) {
        if(error.response.status = 404){
            console.log(c.red('Breach Not Found'))
        } else {
            console.log(error)
        }
    }
  }
  
  main();