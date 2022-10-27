import { Database } from 'fakebase';

const db = new Database('./data');

export const Company = db.table('companies');
export const Job = db.table('jobs');
export const User = db.table('users');
export const CEO = db.table('ceos');
export const Car = db.table('cars');
export const CarType = db.table('carTypes');

