import { Database } from 'fakebase';

const db = new Database('./test-db/data');

export const Company = db.table('companies');
export const Job = db.table('jobs');
export const User = db.table('users');
export const CEO = db.table('ceos');
export const Car = db.table('cars');
export const CarType = db.table('carType');



///Users/mcphail.alex/codesmith/53/OSP/LatchQL/LatchQL/src/test-db/data