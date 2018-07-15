const graphql = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList
} = require('graphql');
const User = require('../model/User');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        name: {type:GraphQLString},
        password: {type:GraphQLString}
    })
})

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

module.exports = new GraphQLSchema({
    query:Query,
    mutation:Mutation
})