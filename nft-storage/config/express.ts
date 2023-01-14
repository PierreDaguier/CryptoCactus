import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import methodOverride from 'method-override'



const ServerListenOnPort8000 = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression())
    app.use(methodOverride())
    app.listen(8000, () => {
        console.log('Server listening on port 8000')
    })
}

export default ServerListenOnPort8000