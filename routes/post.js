const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
    update,
} = require('../controllers/post');
const authenticate = require('../middlewares/authenticate');
const { canAccess } = require('../middlewares/can-access');
const { Roles } = require('../lib/constants');

const router = express.Router();

router.post('/', authenticate, canAccess([Roles.Tpo, Roles.Teacher]), create);
router.get('/', authenticate, index);
router.get('/:id', authenticate, indexOne);
router.patch(
    '/:id',
    authenticate,
    canAccess([Roles.Tpo, Roles.Teacher]),
    update,
);
router.delete(
    '/:id',
    authenticate,
    canAccess([Roles.Tpo, Roles.Teacher]),
    remove,
);

module.exports = { postRouter: router };
