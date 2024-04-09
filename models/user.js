const mongoose = require('mongoose');
const { Roles } = require('../lib/constants');

const userSchema = new mongoose.Schema({
    SN: {
        type: String,
        req: true,
    },
    College_ID: {
        type: String,
        req: true,
    },
    Enrollment_String: {
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
        type: String,
        req: true,
    },
    SSC_Percentage: {
        type: String,
        req: true,
    },
    SSC_Year_Of_Passing: {
        type: String,
        req: true,
    },
    SSC_Board: {
        type: String,
        req: true,
    },
    HSC_Percentage: {
        type: String,
        req: true,
    },
    HSC_Year_Of_Passing: {
        type: String,
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
        type: String,
        req: false,
    },
    Diploma_Year_Of_Passing: {
        type: String,
        req: false,
    },
    Diploma_Board: {
        type: String,
        req: false,
    },
    I_Semester_Percentage: {
        type: String,
        req: true,
    },
    II_Semester_Percentage: {
        type: String,
        req: true,
    },
    III_Semester_Percentage: {
        type: String,
        req: true,
    },
    IV_Semester_Percentage: {
        type: String,
        req: true,
    },
    BE_AGGREGATE: {
        type: String,
        req: true,
    },
    I_Semester_PTR: {
        type: String,
        req: true,
    },
    II_Semester_PTR: {
        type: String,
        req: true,
    },
    III_Semester_PTR: {
        type: String,
        req: true,
    },
    IV_Semester_PTR: {
        type: String,
        req: true,
    },
    BE_SGPA: {
        type: String,
        req: true,
    },
    Current_Backlog: {
        type: String,
        req: true,
    },
    History_Of_Backlog: {
        type: String,
        req: true,
    },
    Year_down: {
        type: String,
        req: true,
    },
    Mobile_String: {
        type: String,
        req: true,
    },
    Email_ID: {
        type: String,
        req: true,
    },
    Password: {
        type: String,
        req: true,
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
    Aadhar_String: {
        type: String,
        req: true,
    },
    University_Roll_String: {
        type: String,
        req: true,
    },
    Role: {
        type: String,
        enum: [Roles.Student, Roles.Teacher, Roles.Tpo],
        default: Roles.Student,
    },
});

const UserModel = mongoose.model('User', userSchema, 'users');

module.exports = { UserModel };
