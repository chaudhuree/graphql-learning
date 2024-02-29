import { getJobs,getJob, getJobsByCompany } from "./db/jobs.js";
import {getCompany} from "./db/companies.js";
export const resolvers = {
  Query: {
    jobs: async () => {
      return await getJobs();
    },
    job: async (_root, { id }) => {
      return await getJob(id);
    },
    company: async (_root, { id }) => {
      return await getCompany(id);
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
