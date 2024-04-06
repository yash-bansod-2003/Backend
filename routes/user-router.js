const express = require('express');
const {
    register,
    login,
    update,
    remove,
} = require('../controllers/user-controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
