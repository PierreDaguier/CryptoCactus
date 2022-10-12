// This is main program

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const fspromises = require('fs/promises')
const fs = require('fs')
const config = fs.readFileSync('./config.json')
const infos = JSON.parse(config)
const triggerMint = require('./triggerMint.js')
const uploadMetadata = require('./upload.mjs')


const CronJob = require('cron').CronJob
const Updateplant = async () => {
    try {
        uploadMetadata.main()
    }
    catch(error) {
        console.error(error);
    }
    try {
        triggerMint.mintOne() 
    }
    catch(error) {
        console.error(error);
    }
}
const job = new CronJob('0 * * * * *', Updateplant())
job.start()

const PORT = process.env.PORT || 4000

// This is the express answer to request on /
// app.get('/', async (req, res) => {

    
// })

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`)
})