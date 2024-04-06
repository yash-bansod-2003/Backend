const express = require("express");
const {
  register,
  login,
  update,
  updatePassword,
} = require("../controllers/student-controller");

const router = express.Router();

router.post("/register", register)
router.post("/login", login);
router.patch("/update", update);
router.patch("/updatePassword", updatePassword);

module.exports = router;
