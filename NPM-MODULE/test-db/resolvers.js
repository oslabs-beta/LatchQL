import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    job: (root, { id }) => {
      return Job.findById(id);
    },
    jobs: async () => {
      return Job.findAll();
    },
    company: (root, { id }) => {
      return Company.findById(id);
    },
  },
  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
};
