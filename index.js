const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config');

const typeDefs = gql`
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

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server is running at ${res.url}`)
    })