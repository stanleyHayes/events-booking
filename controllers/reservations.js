const Reservation = require("../models/reservation");


const createReservation = async (req, res) => {
    try {
        event.body.user = req.user;
        const {event, user} = req.body;
        let reservation = await Reservation.findOne({event, user});
        if(reservation){return res.status(409).json({data: {}, message: `Already registered for event`});}
        reservation = await Reservation.create({event, user});
        await reservation.populate({path: 'event'}).execPopulate()
        res.status(201).json({data: reservation, message: `Successfully registered for the event ${event.name}`})
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const getReservations = async (req, res) => {
    try {
        const match = {};
        if(req.params.user){
            match["user"] = req.params.user;
        }
        if(req.params.event){
            match["event"] = req.params.event;
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reservations = await Reservation.find(match).populate({path: 'event', options: {skip, limit}});
        res.status(200).json({ data: reservations, count: reservations.length, message: `Retrieved ${reservations.length} reservations` });
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) { return res.status(404).json({ data: {}, message: `Event with id ${req.params.id} not found` }) }
        res.status(200).json({ data: reservation, message: `Reservation retrieved successfully` });
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

const updateReservation = async (req, res) => {
    try {
        let reservation = await Event.findById(req.params.id);
        if (!reservation) { return res.status(404).json({ data: {}, message: `Reservation with id ${req.params.id} not found` }) }
        if (reservation.user !== req.user || req.user.role !== 'ADMIN') { return res.status(400).json({ data: {}, message: `You are not the owner of this event` }) }
        const updates = Object.keys(req.body);
        const allowedUpdates = ['status'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) { return res.status(400).json({ data: reservation, message: `Update notS allowed` }) }
        for (let key in req.body) {
            reservation[key] = req.body[key];
        }
        reservation = await reservation.save();
        await reservation.populate({path: 'event'}).execPopulate();
        res.status(200).json({ data: reservation, message: `Successfully updated event` })
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
}

module.exports = {updateReservation, getReservations, getReservation, createReservation};