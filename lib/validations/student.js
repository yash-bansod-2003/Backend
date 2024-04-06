const Joi = require('joi');

const studentRegisterValidator = Joi.object({
    SN: Joi.number().required(),
    College_ID: Joi.string().required(),
    Enrollment_Number: Joi.string().required(),
    Full_Name: Joi.string().required(),
    Gender: Joi.string().required(),
    Date_of_Birth: Joi.string().required(),
    Branch: Joi.string().required(),
    College: Joi.string().required(),
    Year_Of_Passing: Joi.number().required(),
    SSC_Percentage: Joi.number().required(),
    SSC_Year_Of_Passing: Joi.number().required(),
    SSC_Board: Joi.string().required(),
    HSC_Percentage: Joi.number().required(),
    HSC_Year_Of_Passing: Joi.number().required(),
    HSC_Board: Joi.string().required(),
    Diploma_Branch: Joi.string().optional(),
    Diploma_Percentage: Joi.number().optional(),
    Diploma_Year_Of_Passing: Joi.number().optional(),
    Diploma_Board: Joi.string().optional(),
    I_Semester_Percentage: Joi.number().required(),
    II_Semester_Percentage: Joi.number().required(),
    III_Semester_Percentage: Joi.number().required(),
    IV_Semester_Percentage: Joi.number().required(),
    BE_AGGREGATE: Joi.number().required(),
    I_Semester_PTR: Joi.number().required(),
    II_Semester_PTR: Joi.number().required(),
    III_Semester_PTR: Joi.number().required(),
    IV_Semester_PTR: Joi.number().required(),
    BE_SGPA: Joi.number().required(),
    Current_Backlog: Joi.number().required(),
    History_Of_Backlog: Joi.number().required(),
    Year_down: Joi.number().required(),
    Mobile_Number: Joi.number().required(),
    Email_ID: Joi.string().required(),
    Local_Address: Joi.string().required(),
    Permanent_Address: Joi.string().required(),
    University: Joi.string().required(),
    Skill_Set: Joi.string().required(),
    Aadhar_Number: Joi.string().required(),
    University_Roll_Number: Joi.number().required(),
});

const studentLoginValidator = Joi.object({
    Email_ID: Joi.string().required(),
    Password: Joi.string().required(),
});

const studentPasswordUpdateValidator = Joi.object({
    Email_ID: Joi.string().required(),
    Password: Joi.string().required(),
    Repeat_Password: Joi.ref('Password'),
});

const studentUpdateValidator = Joi.object({
    Email_ID: Joi.string(),
    SSC_Percentage: Joi.number(),
    SSC_Year_Of_Passing: Joi.number(),
    SSC_Board: Joi.string(),
    HSC_Percentage: Joi.number(),
    HSC_Year_Of_Passing: Joi.number(),
    HSC_Board: Joi.string(),
    Diploma_Branch: Joi.string(),
    Diploma_Percentage: Joi.number(),
    Diploma_Year_Of_Passing: Joi.number(),
    Diploma_Board: Joi.string(),
});

module.exports = {
    studentLoginValidator,
    studentRegisterValidator,
    studentPasswordUpdateValidator,
    studentUpdateValidator,
};
