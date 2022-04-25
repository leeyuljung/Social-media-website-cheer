const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getPosts: [Post]
    }

    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
`