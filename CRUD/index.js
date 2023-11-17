const express = require('express')
const cors = require('cors')
const router = require('./routes')
// const dotenv = require('dotenv')
// import express from 'express'
// import cors from 'cors'

// dotenv.config()

const app = express()
const port = 5000
// const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})