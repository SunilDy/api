const graphql = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');
const User = require('../model/User');

const UserType = new GraphQLObjectType({
    fields: () => ({
        name: {type:GraphQLString},
        password: {type:GraphQLString}
    })
})

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                password: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args) {
                let user = new User({
                    name: args.name,
                    password: args.password
                })
                return user.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({mutation:Mutation})