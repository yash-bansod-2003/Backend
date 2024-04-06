const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
} = require('../controllers/job-application-controller');

const router = express.Router();

router.post('/', create);
router.get('/', index);
router.get('/:id', indexOne);
router.delete('/:id', remove);

module.exports = router;
