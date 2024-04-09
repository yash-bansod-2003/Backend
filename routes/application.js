const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
    indexStudentApplications,
} = require('../controllers/application');

const router = express.Router();

router.post('/', create);
router.get('/', index);
router.get('/student/:id', indexStudentApplications);
router.get('/:id', indexOne);
router.delete('/:id', remove);

module.exports = { applicationRouter: router };
