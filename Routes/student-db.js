import express from "express";

import { studentModel } from "../DB-utils/models.js";

const studentDbRouter = express.Router();


//Create a new student

studentDbRouter.post("/", async (req, res) => {
    try {
        const payload = req.body;
        
        const student = new studentModel({
            ...payload,
            id: Date.now().toString(),
            teacherId: null,
        });
        try {
          await student.save(); //  validate and insert the student

          res.status(201).send({ msg: "Student Created Successfully!" });  

        } catch (error) {
            console.log(error);
          res.status(400).send({ msg: "Please enter all the fields for Student" });  
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


// get all the students
studentDbRouter.get("/", async (req, res) => {
     try {
        const students = await studentModel.find({}, {_id: 0, _v: 0});
        res.send({ msg: "Info about all the students", students})
     } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
     }
});

// update a single student

studentDbRouter.put("/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const payload = req.body;
        await collection.updateOne({
            id: studentId,     
        },
          {
            $set: payload,
          }
     );
      res.send({ msg: "Student Updated Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

//delete a single student

studentDbRouter.delete("/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
       
        await collection.deleteOne({
            id: studentId,     
        });
      res.send({ msg: "Student Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default studentDbRouter;