const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  SN: {
    type: Number,
    req: true,
  },
  College_ID: {
    type: String,
    req: true,
  },
  Enrollment_Number: {
    type: String,
    req: true,
  },
  Full_Name: {
    type: String,
    req: true,
  },
  Gender: {
    type: String,
    req: true,
  },
  Date_of_Birth: {
    type: String,
    req: true,
  },
  Branch: {
    type: String,
    req: true,
  },
  College: {
    type: String,
    req: true,
  },
  Year_Of_Passing: {
    type: Number,
    req: true,
  },
  SSC_Percentage: {
    type: Number,
    req: true,
  },
  SSC_Year_Of_Passing: {
    type: Number,
    req: true,
  },
  SSC_Board: {
    type: String,
    req: true,
  },
  HSC_Percentage: {
    type: Number,
    req: true,
  },
  HSC_Year_Of_Passing: {
    type: Number,
    req: true,
  },
  HSC_Board: {
    type: String,
    req: true,
  },
  Diploma_Branch: {
    type: String,
    req: false,
  },
  Diploma_Percentage: {
    type: Number,
    req: false,
  },
  Diploma_Year_Of_Passing: {
    type: Number,
    req: false,
  },
  Diploma_Board: {
    type: String,
    req: false,
  },
  I_Semester_Percentage: {
    type: Number,
    req: true,
  },
  II_Semester_Percentage: {
    type: Number,
    req: true,
  },
  III_Semester_Percentage: {
    type: Number,
    req: true,
  },
  IV_Semester_Percentage: {
    type: Number,
    req: true,
  },
  BE_AGGREGATE: {
    type: Number,
    req: true,
  },
  I_Semester_PTR: {
    type: Number,
    req: true,
  },
  II_Semester_PTR: {
    type: Number,
    req: true,
  },
  III_Semester_PTR: {
    type: Number,
    req: true,
  },
  IV_Semester_PTR: {
    type: Number,
    req: true,
  },
  BE_SGPA: {
    type: Number,
    req: true,
  },
  Current_Backlog: {
    type: Number,
    req: true,
  },
  History_Of_Backlog: {
    type: Number,
    req: true,
  },
  Year_down: {
    type: Number,
    req: true,
  },
  Mobile_Number: {
    type: Number,
    req: true,
  },
  Email_ID: {
    type: String,
    req: true,
  },
  Password: {
    type: String,
    default: "Pass@123"
  },
  Local_Address: {
    type: String,
    req: true,
  },
  Permanent_Address: {
    type: String,
    req: true,
  },
  University: {
    type: String,
    req: true,
  },
  Skill_Set: {
    type: String,
    req: true,
  },
  Aadhar_Number: {
    type: String,
    req: true,
  },
  University_Roll_Number: {
    type: Number,
    req: true,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema, "students");

module.exports = StudentModel;
