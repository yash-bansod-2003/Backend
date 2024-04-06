const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
    update,
} = require('../controllers/job-post-controller');

const router = express.Router();

router.post('/', create);
router.get('/', index);
router.get('/:id', indexOne);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
