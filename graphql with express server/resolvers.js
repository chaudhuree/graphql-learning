import { getJobs } from "./db/jobs.js";
export const resolvers = {
  Query: {
    greeting: () => "hello chaudhuree",
    jobs: async () => {
      const jobs = await getJobs();
      console.log(jobs);
      return jobs;
      // return [
      //   {
      //     id: "1",
      //     title: "Software Engineer",
      //     description: "Some description about the job",
      //   },
      //   {
      //     id: "2",
      //     title: "Backend Engineer",
      //     description: "Some description about the job",
      //   },
      // ];
    },
  },
};
