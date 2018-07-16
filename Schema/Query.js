const graphql = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');
const User = require('../model/User');
const {UserType} = require('./Types');

const Query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: {
            type: UserType,
            args: {
                name: {type:new GraphQLNonNull(GraphQLString)},
                password: {type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(_,{name,password}) {
                const user = User.findOne({name, password});
                return user;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args) {
                return User.find({})
            }
        }
    }
})


module.exports = Query;