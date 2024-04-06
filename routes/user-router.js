const express = require('express');
const {
    register,
    login,
    update,
    remove,
} = require('../controllers/user-controller');
const { canAccess } = require('../middlewares/can-access');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/:id', canAccess(['tpo']), update);
router.delete('/:id', canAccess(['tpo']), remove);

module.exports = router;
