const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
} = require('../controllers/application');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, index);
router.get('/:id', authenticate, indexOne);
router.delete('/:id', authenticate, remove);

module.exports = { applicationRouter: router };
