const express = require('express');
const multer = require('multer');
const {
    register,
    login,
    update,
    updatePassword,
    index,
    self,
    indexOne,
    uploadCsv,
    applied,
    notApplied,
    se,
} = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');
const { canAccess } = require('../middlewares/can-access');
const { Roles } = require('../lib/constants');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/upload', authenticate, upload.single('csvFile'), uploadCsv);
router.post('/login', login);
router.get('/', authenticate, index);
router.get('/self', authenticate, self);
router.get('/:id', authenticate, indexOne);
router.get(
    '/applied',
    authenticate,
    canAccess([Roles.Tpo, Roles.Teacher]),
    applied,
);
router.get(
    '/notApplied',
    authenticate,
    canAccess([Roles.Tpo, Roles.Teacher]),
    notApplied,
);
router.patch('/update', authenticate, update);
router.patch('/updatePassword', updatePassword);

module.exports = { userRouter: router };
