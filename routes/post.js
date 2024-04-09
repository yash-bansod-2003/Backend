const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
    update,
} = require('../controllers/post');
const { canAccess } = require('../middlewares/can-access');

const router = express.Router();

router.post('/', canAccess(['teacher', 'tpo']), create);
router.get('/', index);
router.get('/:id', indexOne);
router.patch('/:id', canAccess(['teacher', 'tpo']), update);
router.delete('/:id', canAccess(['teacher', 'tpo']), remove);

module.exports = { postRouter: router };
