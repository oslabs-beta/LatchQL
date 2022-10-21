import {Company, Job} from './db.js';


export const resolvers = {
    Query: {
        job: (root, {id}) => {
            return Job.findById(id);
        },
        // jobs: () => Job.findAll(),
        jobs: () => Job.findAll(),
        
    },

    Job: {
        company: (job)=> {
            return Company.findById(job.companyId)
        }
    }
};



