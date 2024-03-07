import { GraphQLError } from "graphql";
import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";
export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await getJobs();
      if (!jobs) {
        throw new GraphQLError("No jobs found");
      }
      return jobs;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw new GraphQLError("No job found with id: " + id, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return job;
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw new GraphQLError("No company found with id: " + id, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return company;
    },
  },
  Mutation: {
    createJob: async (_root, { input: { title, description } },context) => {
      if(!context.auth){
        throw unauthorizedError('You are not authorized to perform this action');
      }

      const companyId = "FjcJCHJALA4i";
      const job = await createJob({ title, description, companyId });
      return job;
    },
    deleteJob: async (_root, { id }) => {
      const job = await deleteJob(id);
      return job;
    },
    updateJob: async (_root, { input: { id,title, description } }) => {
      const job = await updateJob( {id, title, description });
      return job;
    },
  },
  Job: {
    company: async (job) => {
      // console.log('job', job);

      return await getCompany(job.companyId);
    },
    date: (job) => formatedData(job.createdAt),
  },
  Company: {
    jobs: async (company) => {
      // console.log('company', company);

      return await getJobsByCompany(company.id);
    },
  },
};

function formatedData(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
}