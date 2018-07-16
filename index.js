const express = require('express');
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql');
const Schema = require('./Schema/RootContainer')
const cors = require('cors');

const app = express();

// CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

// Connecting to Mlab
const DB_USER = process.env.DB_USER;// || 'admin';
const DB_PASS = process.env.DB_PASS;// || 'LMAOkutta99MYAPI'
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds239071.mlab.com:39071/my-api`);
mongoose.connection.once('open', () => {
    console.log('Connected to Mlab')
})

app.use(cors());

// Config GraphQL
app.use('/graphql', graphqlHTTP({
    schema:Schema,
    graphiql:true
}))

// PORT config
const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('endPoint')
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})