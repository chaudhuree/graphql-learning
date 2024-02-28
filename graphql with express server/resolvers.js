import { getJobs } from "./db/jobs.js";
import {getCompany} from "./db/companies.js";
export const resolvers = {
  Query: {
    jobs: async () => {
      return await getJobs();
    },
  },
  Job: {
    company: async (job) => {
      return await getCompany(job.companyId);
    },
    date: (job) => formatedData(job.createdAt),
  },
};

function formatedData(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
