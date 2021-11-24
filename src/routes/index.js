const express = require('express');
const {home} = require('../controllers/dummy');
const {login} = require('../controllers/auth');
const {getUsers} = require('../controllers/user')
const router = express.Router();

router.get("/", home);
router.post("/login",login);
router.get("/users",getUsers)
module.exports = router;