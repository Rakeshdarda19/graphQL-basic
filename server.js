import {ApolloServer,gql} from "apollo-server"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import {quotes,users} from './fakeDB.js'


const typeDefs = gql`
    type Query{
        users:[User]
        user(id:ID!):User
        quotes:[Quote]
        iquote(by:ID!):[Quote]
    }
    type User{
        id:ID!
        name:String
        email:String
        password:String
        quotes:[Quote]
    }
    type Quote{
        name:String,
        by:ID
    }
`
const resolvers = {
    Query:{
       users:() => users,
       user:(_,{id}) => users.find(user=>user.id == id),
       quotes:() => quotes,
       iquote:(_,{by}) => quotes.filter(quote=>quote.by == by),

    },
    User:{
        quotes:(usr) => quotes.filter(quote => quote.by == usr.id) 
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
       ApolloServerPluginLandingPageGraphQLPlayground() 
    ]
})

server.listen().then(({url}) => {
    console.log(`server is listening at ${url} `)
})