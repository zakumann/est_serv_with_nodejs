const express =require('express');
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res) => {
    res.send('<h1>This is about Page</h1>')
})

app.listen(3000, () => {
    console.log(`Connecting to the server port 3000`)
})