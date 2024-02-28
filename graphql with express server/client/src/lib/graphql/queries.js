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

export const getJob = async (id) => {
  const query = gql`
    query getJobById($id: ID!){
      job(id: $id) {
        id
        date
        title
        company {
          id
          name
        }
        description
      }
    }
  `
  const data = await client.request(query, { id })
  return data.job
}

export const getCompany = async (id) => {
  const query = gql`
   query getCompanyById( $id: ID!){
      company(id: $id) {
        name
        description
      }
    }
  `
  const data = await client.request(query, { id })
  return data.company
}