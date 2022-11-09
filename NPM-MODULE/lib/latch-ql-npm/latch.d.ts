import { GraphQLSchema } from "graphql";
import { NextFunction, Request, Response } from "express";
declare type locals = {
    authLevel?: string;
    userName?: string;
};
interface authRes extends Response {
    locals: locals;
}
declare type jwtController = {
    setJwt: (req: Request, res: authRes, next: NextFunction) => any;
};
declare const jwtController: jwtController;
export { jwtController };
declare class LatchQL {
    typeDefs: string;
    resolvers: any;
    private schema;
    private schemaWithMiddleWare;
    constructor(types: string, resolvers: {});
    createSchema(): GraphQLSchema;
    addMiddleWare(): import("graphql-middleware/dist/types.js").GraphQLSchemaWithFragmentReplacements;
    middleWare(resolve: any, root: any, args: any, context: any, info: any): Promise<any>;
    startLatch(app: any, port: number): Promise<void>;
}
export { LatchQL };
