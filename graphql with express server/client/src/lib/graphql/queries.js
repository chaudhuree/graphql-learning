import { GraphQLClient,gql } from 'graphql-request'

const endpoint = 'http://localhost:9000/graphql'

const client = new GraphQLClient(endpoint)

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
        date
      }
    }
  `
  const data = await client.request(query)
  return data.jobs
}