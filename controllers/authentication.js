const User = require("../models/user");
const { CREATED, UNAUTHORIZED, SUCCESS, BAD } = require("../utils/constants.js");

/**
 * @description A controller function that registers a user
 * @param {Object} req - An object representing the request object
 * @param {Object} res - An object representing the response object
 * @returns token || erro
 */

const register = async (req, res) => {
    try {
        const { email, name, password, gender, role } = req.body;
        if (!email || !name || !password) return res.status(BAD).json({ error: `Invalid input` });
        const user = await User.findOne({ email }); //check to see if user already exists
        //if user with specified email already exists, return with an error message
        if (user) return res.status(BAD).json({ error: `Account with email ${email} already exists` });
        const createdUser = await User.create({ email, name, password, gender, role });//create new user with email, name, password and save user in database
        const token = await createdUser.token();//generate token from jwt using token method
        await res.status(CREATED).json({ token });
    } catch (error) {
        return res.status(500).json({ error: `Error:${error.message}` });
    }
}


/**
 * @description A controller function that logs an existring user
 * @param {Object} req - An object representing the request object
 * @param {Object} res - An object representing the response object
 * @returns token || error
 */

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(BAD).json({ error: `Invalid input` });
        const user = await User.findOne({ email: email }); //check to see if user already exists
        // if user with specified email already exists, return with an error message
        if (!user) return res.status(UNAUTHORIZED).json({ error: `Invalid email or password` });
        if (!await user.comparePassword(password)) return res.status(UNAUTHORIZED).json({ error: `Invalid email or password` });
        const token = await user.token();//generate token from jwt using token method
        await res.status(SUCCESS).json({ token });
    } catch (error) {
        return res.status(500).json({ error: `Error:${error.message}` });
    }
}



/**
 * @description A controller function that logs an existing logged in user out
 * @param {Object} req - An object representing the request object
 * @param {Object} res - An object representing the response object
 * @returns {}
 */
const logout = async (req, res) => {
    try {
        req.user.logins.filter(login => login.token !== req.token);
        await req.user.save();
        return res.status(SUCCESS).json({});
    } catch (error) {
        return res.status(500).json({ error: `Error:${error.message}` });
    }
}



/**
 * @description A controller function that gets logged in user information
 * @param {Object} req - An object representing the request object
 * @param {Object} res - An object representing the response object
 * @returns {email}
 */
const getProfile = async (req, res) => {
    try {
        res.status(SUCCESS).json({ email: req.user.email })
    } catch (error) {
        return res.status(500).json({ error: `Error:${error.message}` });
    }
}

module.exports = { register, login, logout, getProfile };