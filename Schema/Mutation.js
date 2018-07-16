const graphql = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
const User = require('../model/User');
const {UserType} = require('./Types');

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                password: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(_,args) {
                let user = new User({
                    name: args.name,
                    password: args.password
                })
                return user.save();
            }
        }
    }
})

module.exports = Mutation;