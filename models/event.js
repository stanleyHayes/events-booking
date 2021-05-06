const monogoose = require("mongoose");

const { Schema, model } = monogoose;

const eventSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    date: { type: Date, trim: true, required: true },
    time: { type: Date, trim: true, required: true },
    venue: { type: String, trim: true, required: true },
    category: {type: String},
    price: {
        amount: { type: Number, min: 0, required: true },
        currency: { type: String, required: true },
    }, image: { type: String },
    status: {type: String, enum: ['ACTIVE', 'DELETED']}
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


const Event = model('Event', eventSchema);

module.exports = Event;