const express = require("express");
const { createReservation, updateReservation, getReservations, getReservation } = require("../controllers/reservations");
const { authorize, authenticate } = require("../middleware/authentication");

const router = express.Router({ mergeParams: true });



//api/v1/users/:user/reservations

router.route('/').post(authenticate, authorize('ORGANISER', 'USER'), createReservation)
    .get(getReservations);

router.route('/:id')
    .get(getReservation)
    .put(authenticate, authorize, updateReservation);

module.exports = router;