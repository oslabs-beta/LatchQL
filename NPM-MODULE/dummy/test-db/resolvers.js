import { Company, Job, Ceo, User, Car, CarType } from "./db.js";

export const resolvers = {
  Query: {
    job: ({ id }) => {
      return Job.findById(id);
    },
    jobs: async () => {
      return Job.findAll();
    },
    company: ({ id }) => {
      return Company.findById(id);
    },
    
  },
  Job: {
    company: (job) => {
      return Company.findById(job.companyId);
    },
  },
  Company: {
    ceo: (company) => {
      return Ceo.findById(company.ceoId);
    }
  },
  Ceo: {
    user: (ceo) => {
      return User.findById(ceo.userId);
    },
    car: (ceo) => {
      return Car.findById(ceo.carId);
    }
  },
  Car: {
    style: (car) => {
      return CarType.findById(car.typeId);
    }
  }

};
