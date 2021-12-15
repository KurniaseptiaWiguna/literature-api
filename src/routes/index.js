const express = require('express');
const {home} = require('../controllers/dummy');
const {login,register,checkAuth} = require('../controllers/auth');
const {getUsers, getUser, updateUser} = require('../controllers/user')
const {auth} =require('../middlewares/auth')
const {uploadFile} = require("../middlewares/uploadFile");
const {uploadImage} = require("../middlewares/uploadImage")
const { addLiterature,allLiterature, getLiterature, searchLiterature, getUserLiterature, updateStatus, getAllLiterature } = require('../controllers/literature');
const { addCollection, getCollections,collect } = require('../controllers/collection');
const router = express.Router();

router.get("/", home);
router.post("/login",login);
router.post("/register", register);
router.get("/users",auth,getUsers);
router.patch("/update-user",auth,uploadImage("photo"),updateUser)
router.get("/profile",auth,getUser)

router.post("/literature",auth,uploadFile('file'),addLiterature);
router.get("/literature/:id",auth,getLiterature);
router.get("/all-literature", auth, allLiterature);
router.get("/getAllLiterature",auth, getAllLiterature);
router.get("/user/literature",auth,getUserLiterature)
router.get("/search/:title",auth,searchLiterature);

router.patch("/update/literature/:id",auth,updateStatus);

router.post("/collection",auth,addCollection)
router.get("/collect/:id",collect)
router.get("/collections",auth,getCollections)
router.get("/checkAuth",auth,checkAuth);
module.exports = router;