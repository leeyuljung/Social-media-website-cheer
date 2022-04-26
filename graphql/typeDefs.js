const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getPosts: [Post]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
    }

    input RegisterInput {
        username: String!
        password: String!
        passwordConfirm: String!
        email: String!
    }

    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        token: String!
    }
`