const express  = require( "express");
const {register, logout, login, getProfile}  = require( "../controllers/authentication.js");
const { authenticate }  = require( "../middleware/authentication.js");

const router = express.Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);
module.exports =  router;