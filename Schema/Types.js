const graphql = require('mongoose');
const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        name: {type:GraphQLString},
        password: {type:GraphQLString}
    })
})

module.exports = {
    UserType
}