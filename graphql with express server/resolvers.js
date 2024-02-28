export const resolvers = {
  Query: {
    greeting: () => "hello chaudhuree",
    jobs: () => {
      return [
        {
          id: "1",
          title: "Software Engineer",
          description: "Some description about the job",
        },
        {
          id: "2",
          title: "Backend Engineer",
          description: "Some description about the job",
        },
      ];
    },
  },
};
