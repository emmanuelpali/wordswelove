import {mongoose, Schema, model, models } from 'mongoose';

const QouteSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    quote: {
        type: String,
        required: [true, 'Quote is required'],
    },
    author: {
        type: String,
        required: [true, "The author's name is required"], 
    },
    tag: {
        type: String,
        required: [true, 'a tag is required'],
    }
});

const Quote = models.Quote || model("Quote", QouteSchema);

export default Quote;