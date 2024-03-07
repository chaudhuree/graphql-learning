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
      if(!context.user){
        throw unauthorizedError('You are not authorized to perform this action');
      }

      // const companyId = "FjcJCHJALA4i";
      const job = await createJob({ title, description, companyId:context.user.companyId });
      return job;
    },
    deleteJob: async (_root, { id },context) => {
      if(!context.user){
        throw unauthorizedError('You are not authorized to perform this action');
      }
      const job = await deleteJob(id,context.user.companyId);
      if(!job){
        throw new GraphQLError("No job found with this id: " + id, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
      return job;
    },
    updateJob: async (_root, { input: { id,title, description } },context) => {
      if(!context.user){
        throw unauthorizedError('You are not authorized to perform this action');
      }
      const job = await updateJob( {id, title, description,companyId:context.user.companyId });
      if(!job){
        throw new GraphQLError("No job found with this id: " + id, {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }
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