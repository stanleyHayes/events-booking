const express = require("express");
const { createUser, getUser, getUsers, updateUser, deleteUser } = require("../controllers/users");
const { authorize, authenticate } = require("../middleware/authentication");
const reservationRouter = require("./reservations");
const eventRouter = require("./events");

const router = express.Router({ mergeParams: true });

//api/v1/users/:user/reservations
router.use('/:user/reservations', reservationRouter);

//api/v1/users/:user/events
router.use('/:user/events', eventRouter);


router.route('/').post(authenticate, authorize('ADMIN'), createUser)
    .get(authenticate, authorize('ADMIN'), getUsers);

router.route('/:id')
    .get(authenticate, authorize('ADMIN'), getUser)
    .put(authenticate, authorize('ADMIN'), updateUser)
    .delete(authenticate, authorize('ADMIN'), deleteUser);

module.exports = router;



