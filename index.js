const express = require('express');
const app = express();
const mongoose = require('mongoose')

// Connecting to Mlab
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds239071.mlab.com:39071/my-api`);
mongoose.connection.once('open', () => {
    console.log(`Connected to Mlab`)
})

// PORT config
const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('endPoint')
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})