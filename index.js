import express from 'express'
import { engine } from 'express-handlebars'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import fetch from 'node-fetch'

const app = express();

// Views Setup
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('public'))

const dbPromise = open({
    filename: 'data.db',
    driver: sqlite3.Database
})

// Routes
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/seed', async (req, res) => {
    const db = await dbPromise
    fetch('https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(async (joke) => {
                await db.run('INSERT INTO Jokes (category, setup, punchline) VALUES (?, ?, ?);', joke.type, joke.setup, joke.punchline)
            });
        })
    res.redirect('/')
})

app.get('/random', async (req, res) => {
    const db = await dbPromise
    const joke = await db.all('SELECT * FROM Jokes ORDER BY RANDOM() LIMIT 1;')
    res.json(joke[0])
})

// App Setup
const setup = async () => {
    const db = await dbPromise
    await db.migrate()
    app.listen(8000, () => {
        console.log('listening on localhost:8000')
    })
}

setup()
