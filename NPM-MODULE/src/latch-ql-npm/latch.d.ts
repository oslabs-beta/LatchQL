import { GraphQLSchema } from "graphql";
import { NextFunction, Request, Response } from "express";
type locals = {
    authLevel?: string;
    userName?: string;
};
interface authRes extends Response {
    locals: locals;
}
type jwtController = {
    setJwt: (req: Request, res: authRes, next: NextFunction) => any;
};
export type redisConfigType = {
    port?: number;
    host?: string;
    password?: string;
};
declare const jwtController: jwtController;
export { jwtController };
declare class LatchQL {
    typeDefs: string;
    resolvers: any;
    redisClient: any;
    private schema;
    private schemaWithMiddleWare;
    constructor(types: string, resolvers: {}, redisConfig?: redisConfigType);
    createSchema(): GraphQLSchema;
    addMiddleWare(): import("graphql-middleware/dist/types.js").GraphQLSchemaWithFragmentReplacements;
    rateLimiter(user_ip: any, queryCost: number, rateLimit: number): Promise<boolean>;
    middleWare(resolve: any, root: any, args: any, context: any, info: any): Promise<any>;
    startLatch(app: any, port: number): Promise<void>;
}
export { LatchQL };
