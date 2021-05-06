const Event = require("../models/event");
const Reservation = require("../models/reservation");


const createEvent = async (req, res) => {
    try {
        req.body.owner = req.user;
        const { owner, name, title, description, date, time, price, venue, category } = req.body;
        const event = await Event.create({ owner, name, title, description, date, time, price, venue, category });
        res.status(201).json({ data: event, message: `Successfully created event` })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}

const getEvents = async (req, res) => {
    try {
        const match = {};
        if (req.query.category) {
            match["category"] = req.query.category;
        }
        if (req.params.owner) {
            match["owner"] = req.params.user
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const events = await Event.find(match).skip(skip).limit(limit);
        res.status(200).json({ data: events, count: events.length, message: `Retrieved ${events.length} events` });
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}

const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).json({ data: {}, message: `Event with id ${req.params.id} not found` }) }
        res.status(200).json({ data: event, message: `Event retrieved successfully` });
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}

const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).json({ data: {}, message: `Event with id ${req.params.id} not found` }) }
        if (event.owner !== req.user || req.user.role !== 'ADMIN') { return res.status(400).json({ data: {}, message: `You are not the owner of this event` }) }
        const updates = Object.keys(req.body);
        const allowedUpdates = ['venue', 'date', 'time', 'name', 'category', 'price', 'status'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) { return res.status(400).json({ data: {}, message: `Update notS allowed` }) }
        for (let key in req.body) {
            event[key] = req.body[key];
        }
        event = await event.save();
        res.status(200).json({ data: event, message: `Successfully updated event` })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}

const deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).json({ data: {}, message: `Event with id ${req.params.id} not found` }) }
        if (event.owner !== req.user || req.user.role !== 'ADMIN') { return res.status(400).json({ data: {}, message: `You are not the owner of this event` }) }
        event.status = 'DELETED';
        await Reservation.updateMany({ event: event._id }, { status: 'CANCELLED' });
        res.status(200).json({ data: {}, message: `Successfully deleted event` })
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
}

module.exports = {deleteEvent, updateEvent, getEvent, getEvents, createEvent};