import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectViaMongoose from "./DB-utils/mongoose-connection.js";
import connectToDB from "./DB-utils/mongodb.connection.js";

import studentDbRouter from "./Routes/student-db.js";
import authRouter from "./Routes/auth.js";


const server = express();

// Body Parsing Middleware ->postman api data view on terminal
server.use(express.json());

server.use(cors()); // using the cors middleware to make our apis cors compalint

dotenv.config();

//Custom Middleware
const logger = (req, res, next) => {
    console.log(new Date().toString(), req.url, req.method);
    next();
}
// using the custom middleware
server.use(logger);

// connecting to db before server Starts
// Top level await
await connectViaMongoose();
await connectToDB();


server.use("/students", studentDbRouter);
server.use("/auth", authRouter)

const port = 5900;

server.listen(port, () => {
    console.log(Date().toString(), "listening on port", port)
});