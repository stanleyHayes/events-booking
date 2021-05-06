const monogoose = require("mongoose");

const { Schema, model } = monogoose;

const reservationSchema = new Schema({
    event: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    status: { type: String, enum: ['CANCELLED', 'VALID'], default: 'VALID' },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;