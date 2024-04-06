const Joi = require("joi");
const StudentModel = require("../models/student");
const CustomErrorHandler = require("../services/custom-error-handler");
const { studentRegisterValidator, studentLoginValidator, studentPasswordUpdateValidator, studentUpdateValidator } = require("../lib/validations/student");

async function register(req, res, next) {

  const { error } = studentRegisterValidator.validate(req.body);

  if (error) {
    return next(error);
  }

  const {
    SN,
    College_ID,
    Enrollment_Number,
    Full_Name,
    Gender,
    Date_of_Birth,
    Branch,
    College,
    Year_Of_Passing,
    SSC_Percentage,
    SSC_Year_Of_Passing,
    SSC_Board,
    HSC_Percentage,
    HSC_Year_Of_Passing,
    HSC_Board,
    Diploma_Branch,
    Diploma_Percentage,
    Diploma_Year_Of_Passing,
    Diploma_Board,
    I_Semester_Percentage,
    II_Semester_Percentage,
    III_Semester_Percentage,
    IV_Semester_Percentage,
    BE_AGGREGATE,
    I_Semester_PTR,
    II_Semester_PTR,
    III_Semester_PTR,
    IV_Semester_PTR,
    BE_SGPA,
    Current_Backlog,
    History_Of_Backlog,
    Year_down,
    Mobile_Number,
    Email_ID,
    Local_Address,
    Permanent_Address,
    University,
    Skill_Set,
    Aadhar_Number,
    University_Roll_Number
  } = req.body;

  try {
    const student = await StudentModel.findOne({ Email_ID });

    console.log(student);

    if (student) {
      return next(CustomErrorHandler.alreadyExists("student already exists"));
    }

    const createStudent = await StudentModel.create({
      SN,
      College_ID,
      Enrollment_Number,
      Full_Name,
      Gender,
      Date_of_Birth,
      Branch,
      College,
      Year_Of_Passing,
      SSC_Percentage,
      SSC_Year_Of_Passing,
      SSC_Board,
      HSC_Percentage,
      HSC_Year_Of_Passing,
      HSC_Board,
      Diploma_Branch,
      Diploma_Percentage,
      Diploma_Year_Of_Passing,
      Diploma_Board,
      I_Semester_Percentage,
      II_Semester_Percentage,
      III_Semester_Percentage,
      IV_Semester_Percentage,
      BE_AGGREGATE,
      I_Semester_PTR,
      II_Semester_PTR,
      III_Semester_PTR,
      IV_Semester_PTR,
      BE_SGPA,
      Current_Backlog,
      History_Of_Backlog,
      Year_down,
      Mobile_Number,
      Email_ID,
      Local_Address,
      Permanent_Address,
      University,
      Skill_Set,
      Aadhar_Number,
      University_Roll_Number
    });

    if (!createStudent) {
      return next(CustomErrorHandler.serverError("student not created"))
    }

    return res.json(createStudent);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

async function login(req, res, next) {

  const { error } = studentLoginValidator.validate(req.body);

  if (error) {
    return next(error);
  }

  const { Email_ID, Password } = req.body;

  try {
    const student = await StudentModel.findOne({ Email_ID });

    if (!student) {
      return next(CustomErrorHandler.notFound("student not found"));
    }

    const match = student.Password === Password;

    if (!match) {
      return next(CustomErrorHandler.wrongCredentials());
    }

    return res.json(student);
  } catch (error) {
    return next(error);
  }
}

async function updatePassword(req, res, next) {
  const { error } = studentPasswordUpdateValidator.validate(req.body);

  if (error) {
    return next(error);
  }

  const { Email_ID, Password } = req.body;

  try {
    const student = await StudentModel.findOne({ Email_ID });

    if (!student) {
      return next(CustomErrorHandler.notFound("student not found"));
    }

    const passwordUpdatedStudent = await StudentModel.findOneAndUpdate({
      Email_ID
    }, { Password })

    return res.json(passwordUpdatedStudent);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  const { error } = studentUpdateValidator.validate(req.body);

  if (error) {
    return next(error);
  }

  const {
    Email_ID,
    SSC_Percentage,
    SSC_Year_Of_Passing,
    SSC_Board,
    HSC_Percentage,
    HSC_Year_Of_Passing,
    HSC_Board,
    Diploma_Branch,
    Diploma_Percentage,
    Diploma_Year_Of_Passing,
    Diploma_Board,
  } = req.body;

  try {
    const student = await StudentModel.findOne({ Email_ID });

    if (!student) {
      return next(CustomErrorHandler.notFound("student not found"));
    }

    const updatedStudent = await StudentModel.findOneAndUpdate({
      Email_ID
    }, {
      SSC_Percentage,
      SSC_Year_Of_Passing,
      SSC_Board,
      HSC_Percentage,
      HSC_Year_Of_Passing,
      HSC_Board,
      Diploma_Branch,
      Diploma_Percentage,
      Diploma_Year_Of_Passing,
      Diploma_Board,
    })

    return res.json(updatedStudent);
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, updatePassword, update };
