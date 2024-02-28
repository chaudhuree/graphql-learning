import { getJobs } from "./db/jobs.js";
export const resolvers = {
  Query: {
    jobs: async () => {
      return await getJobs();
    },
  },
  Job: {
    date: (job) => formatedData(job.createdAt),
  },
};

function formatedData(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
