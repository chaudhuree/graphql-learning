import { GraphQLClient, gql } from "graphql-request";

const endpoint = "http://localhost:9000/graphql";

const client = new GraphQLClient(endpoint);

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
  `;
  const data = await client.request(query);
  return data.jobs;
};

export const getJob = async (id) => {
  const query = gql`
    query getJobById($id: ID!) {
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
  `;
  const data = await client.request(query, { id });
  return data.job;
};

export const getCompany = async (id) => {
  const query = gql`
    query getCompanyById($id: ID!) {
      company(id: $id) {
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const data = await client.request(query, { id });
  return data.company;
};

// mutation: create job
export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const variables = { input: { title, description } };
  const data = await client.request(mutation, variables);
  return data.job;
}
