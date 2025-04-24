import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './reaction.js'

interface IThought extends Document {
   thoughtText: String,
   createdAt: Schema.Types.Date,
   username: Schema.Types.ObjectId,
   reactions?: Schema.Types.ObjectId[],
}

const thoughtSchema = new Schema<IThought>(
   {
      thoughtText: {
         type: String,
         required: true,
         minlength: 1,
         maxlength: 280,
      },
      createdAt: {
         type: Date,
         default: () => new Date(),
         get: function (timestamp: Date) {
            return timestamp.toISOString();
         },
      },
      username: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      reactions: [reactionSchema],
   },
)

const Thought = model('thought', thoughtSchema);

export default Thought;