import { Database } from 'fakebase';

const db = new Database('./test-db/data');

export const Company = db.table('companies');
export const Job = db.table('jobs');
export const User = db.table('users');


///Users/mcphail.alex/codesmith/53/OSP/LatchQL/LatchQL/src/test-db/data