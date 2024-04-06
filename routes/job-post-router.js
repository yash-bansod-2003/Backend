const express = require('express');
const {
    create,
    index,
    indexOne,
    remove,
    update,
} = require('../controllers/job-post-controller');
const { canAccess } = require('../middlewares/can-access');

const router = express.Router();

router.post('/', canAccess(['teacher', 'tpo']), create);
router.get('/', canAccess(['teacher', 'tpo']), index);
router.get('/:id', canAccess(['teacher', 'tpo']), indexOne);
router.patch('/:id', canAccess(['teacher', 'tpo']), update);
router.delete('/:id', canAccess(['teacher', 'tpo']), remove);

module.exports = router;
