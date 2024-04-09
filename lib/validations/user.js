const Joi = require('joi');

const userRegisterValidator = Joi.object({
    SN: Joi.number().required().optional(),
    College_ID: Joi.string().required().optional(),
    Enrollment_Number: Joi.string().required().optional(),
    Full_Name: Joi.string().required(),
    Gender: Joi.string().required().optional(),
    Date_of_Birth: Joi.string().required().optional().optional(),
    Branch: Joi.string().required().optional(),
    College: Joi.string().required().optional(),
    Year_Of_Passing: Joi.number().required().optional(),
    SSC_Percentage: Joi.number().required().optional(),
    SSC_Year_Of_Passing: Joi.number().required().optional(),
    SSC_Board: Joi.string().required().optional(),
    HSC_Percentage: Joi.number().required().optional(),
    HSC_Year_Of_Passing: Joi.number().required().optional(),
    HSC_Board: Joi.string().required().optional(),
    Diploma_Branch: Joi.string().optional(),
    Diploma_Percentage: Joi.number().optional(),
    Diploma_Year_Of_Passing: Joi.number().optional(),
    Diploma_Board: Joi.string().optional(),
    I_Semester_Percentage: Joi.number().required().optional(),
    II_Semester_Percentage: Joi.number().required().optional(),
    III_Semester_Percentage: Joi.number().required().optional(),
    IV_Semester_Percentage: Joi.number().required().optional(),
    BE_AGGREGATE: Joi.number().required().optional(),
    I_Semester_PTR: Joi.number().required().optional(),
    II_Semester_PTR: Joi.number().required().optional(),
    III_Semester_PTR: Joi.number().required().optional(),
    IV_Semester_PTR: Joi.number().required().optional(),
    BE_SGPA: Joi.number().required().optional(),
    Current_Backlog: Joi.number().required().optional(),
    History_Of_Backlog: Joi.number().required().optional(),
    Year_down: Joi.number().required().optional(),
    Mobile_Number: Joi.number().required().optional(),
    Email_ID: Joi.string().required(),
    Local_Address: Joi.string().required().optional(),
    Permanent_Address: Joi.string().required().optional(),
    University: Joi.string().required().optional(),
    Skill_Set: Joi.string().required().optional(),
    Aadhar_Number: Joi.string().required().optional(),
    University_Roll_Number: Joi.string().required().optional(),
    Password: Joi.string().required().optional().default('Password@123'),
});

const userLoginValidator = Joi.object({
    Email_ID: Joi.string().required(),
    Password: Joi.string().required(),
});

const userPasswordUpdateValidator = Joi.object({
    Email_ID: Joi.string().required(),
    Password: Joi.string().required(),
    Repeat_Password: Joi.ref('Password'),
});

const userUpdateValidator = Joi.object({
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
    userLoginValidator,
    userPasswordUpdateValidator,
    userRegisterValidator,
    userUpdateValidator,
};
