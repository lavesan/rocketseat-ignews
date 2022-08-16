import { Client as FaunaClient } from "faunadb";

export const faunaClient = new FaunaClient({
    secret: process.env.FAUNA_DB_KEY,
    // scheme: "http",
    // domain: "localhost",
    // port: 8443,
})