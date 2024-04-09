const express = require('express');
const multer = require('multer');
const {
    register,
    login,
    update,
    updatePassword,
    index,
    indexOne,
    uploadCsv,
} = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/upload', authenticate, upload.single('csvFile'), uploadCsv);
router.post('/login', login);
router.get('/', authenticate, index);
router.get('/:id', authenticate, indexOne);
router.patch('/update', authenticate, update);
router.patch('/updatePassword', updatePassword);

module.exports = { userRouter: router };
