import express from "express";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../DB-utils/models.js";
import { db } from "../DB-utils/mongodb.connection.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    try {
        const userDetails = req.body;
       
        bcrypt.hash(userDetails.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).send({ msg: "Something went wrong, please try again" })
            } else {
                 
                const tempData = {
                    ...userDetails,
                    password: hash,
                };

                // store the above user into the db
                const user = new userModel(tempData);

                await user.save(); // validate the schema and insert the record into the db

                res.send({ msg: "Registration Successfully!" });
            }
        });

    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const creds = req.body;
        // check if the user email exists in the db
        const userObj = await db.collection("users").findOne({ email: creds.identifier }, {projection: {_id: 0, __v: 0}});
    
        if (userObj) {
        // check the password matching
        bcrypt.compare(creds.password, userObj.password, (err, result) => {
        if (result) {
            const tempUser = {...userObj};

            delete tempUser.password;

            const token = jwt.sign(tempUser, process.env.JWT_SECRET, 
                { 
                    expiresIn: process.env.EXPIRY_TIME,
                });

            res.send({ msg: "Login Successfully!", userToken: token });
        } else {
            res.status(401).send({ msg: "Invalid Username or Password" })
        }
        });
    } else {
        res.status(400).send({ msg: "Invalid Username or Password" });
    }
    
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
})
export default authRouter;