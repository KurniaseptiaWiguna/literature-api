const express = require('express');
const {home} = require('../controllers/dummy');
const {login,register} = require('../controllers/auth');
const {getUsers} = require('../controllers/user')
const router = express.Router();

router.get("/", home);
router.post("/login",login);
router.post("/register", register);
router.get("/users",getUsers)
module.exports = router;