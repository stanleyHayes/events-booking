const express = require("express");
const { createEvent, getEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/events");
const { authorize, authenticate } = require("../middleware/authentication");
const reservationRouter = require("./reservations");

const router = express.Router({ mergeParams: true });

//api/v1/events/:event/reservations
router.use('/:event/reservations', reservationRouter);

router.route('/').post(authenticate, authorize('ORGANISER'), createEvent)
    .get(getEvents);

router.route('/:id')
    .get(getEvent)
    .put(authenticate, authorize('ORGANISER'), updateEvent)
    .delete(authenticate, authorize('ORGANISER'), deleteEvent);

module.exports = router;