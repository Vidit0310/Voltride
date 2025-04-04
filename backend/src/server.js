const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRotes')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('server running')
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log('server listening on ' + PORT)
})