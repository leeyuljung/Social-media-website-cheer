const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
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
        comments: [Comment]!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        token: String!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
`