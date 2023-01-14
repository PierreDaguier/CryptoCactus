const { createYoga, createSchema } = require ('graphql-yoga')
const { createServer } = require ('http')
const { importSchema } = require('graphql-import')
const resolvers = require('./src/resolvers/resolver')
const typeDefs = importSchema('./src/schemas/schema.graphql')

const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers })
  })

const server = createServer(yoga);
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
  })
