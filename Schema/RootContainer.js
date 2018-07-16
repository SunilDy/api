const graphql = require('mongoose');
const { GraphQLSchema } = require('graphql');
const query = require('./Query');
const mutation = require('./Mutation');

module.exports = new GraphQLSchema({
    query,
    mutation
})