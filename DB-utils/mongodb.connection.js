import { MongoClient } from "mongodb";

import  dotenv  from "dotenv";

dotenv.config();


const dbName = process.env.DB_NAME || "local-fsd56we-tamil";

//username & password will be required on connecting to cloud DB

const dbUser = process.env.DB_USERNAME || "";

const dbPassword = process.env.DB_PASSWORD || "";

const dbCluster = process.env.DB_CLUSTER || "";


// Creating a client instance 

const cloudUrl = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`

// Cloud URL-MongoDb Cloud Atlas

const client = new MongoClient(cloudUrl);

// Selecting a particular DB-Name

const db = client.db(dbName);

const connectToDB = async () => {
    try {
        await client.connect();
        console.log("DB Connected Successfully!");
    } catch (error) {
        console.log("Error Connecting the database", error);
        process.exit(1);
    }
};

export { db, client };

export default connectToDB;