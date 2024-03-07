import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  concat,
  createHttpLink,
  gql,
} from "@apollo/client";
// import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";

// const endpoint = "http://localhost:9000/graphql";

// const client = new GraphQLClient(endpoint, {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { 'Authorization': `Bearer ${accessToken}` };
//     }
//     return {};
//   },
// });

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});
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
  // const data = await client.request(query);
  // return data.jobs;
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  return data.jobs;
};

// create job query fragment
const jobDetailsFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

export const getJob = async (id) => {
  const query = gql`
    query getJobById($id: ID!) {
      job(id: $id) {
        ...JobDetail
      }
    }
    ${jobDetailsFragment}
  `;
  // const data = await client.request(query, { id });
  // return data.job;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  });
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
  // const data = await client.request(query, { id });
  // return data.company;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  });
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
  // const variables = { input: { title, description } };
  // const data = await client.request(mutation, variables);
  // return data.job;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
  });
  return data.job;
}

// mutation: delete job
export async function deleteJob(id) {
  const mutation = gql`
    mutation DeleteJob($id: ID!) {
      job: deleteJob(id: $id) {
        id
        title
      }
    }
  `;
  // const variables = { id };
  // const data = await client.request(mutation, variables);
  // return data.job;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { id },
  });

  return data.job;
}

// mutation: update job
export async function updateJob({ id, title, description }) {
  const mutation = gql`
    mutation UpdateJob($input: UpdateJobInput!) {
      job: updateJob(input: $input) {
        id
        title
        description
      }
    }
  `;
  // const variables = { input: { id, title, description } };
  // const data = await client.request(mutation, variables);
  // return data.job;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { id, title, description } },
  });
  return data.job;
}
