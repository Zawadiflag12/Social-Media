import { Schema, model } from 'mongoose';
import reactionSchema from './reaction.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        get: function (timestamp) {
            return timestamp.toISOString();
        },
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    reactions: [reactionSchema],
});
const Thought = model('thought', thoughtSchema);
export default Thought;
