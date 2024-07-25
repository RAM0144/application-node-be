import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: "string",
        required: true,
    },
    id: {
        type: "string",
        required: true,
    },
    age: {
        type: "string",
        required: true,
    },

    image: {
        type: "string",
        required: true,
    },
});

const studentModel = new model("student", studentSchema, "students");

const userSchema = new Schema({
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    mobile: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",  
    },
    dob: {
        type: "string",
        required: true,
    },
    
});

const userModel = new model("user", userSchema, "users");


export { studentModel, userModel };