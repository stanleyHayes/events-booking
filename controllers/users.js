const createUser = async (req, res) => {
    try {
        res.status(201).json({data: {}, message: `Successfully created event`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const getUsers = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: `Successfully created event`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const getUser = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: `Successfully created event`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const updateUser = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: `Successfully created event`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const deleteUser = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: `Successfully created event`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

module.exports = {createUser, getUser, getUsers, updateUser, deleteUser};