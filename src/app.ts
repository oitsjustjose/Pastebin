import { json, urlencoded } from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import * as routes from './app/Routes/routes'

dotenv.config()

const app = express()

app.use(json())
app.use(urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/Views'))

app.use(express.static(path.join(__dirname, './public')))

mongoose.connect(`mongodb://${process.env.MONGO_URL}/paste`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((ex) => {
    console.error(ex)
    process.exit(1)
})

routes.init(app)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})

