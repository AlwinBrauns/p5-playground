require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT || 3333, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3333}`)
})