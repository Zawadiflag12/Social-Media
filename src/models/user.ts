import { Schema,  model, type Document } from 'mongoose';

interface IUsers extends Document {
   username: String;
   email: String;
   thoughts?: Schema.Types.ObjectId[];
   friends?: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUsers>(
   {
      username: {
         type: String,
         unique: true,
         required: true,
         trimed: true,
      },
      email: {
         type: String,
         unique: true,
         required: true,
         validate: {
            validator: function(email) {
               return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
             },
            message: '{VALUE} is not a valid email',
         }
      },
      thoughts: {
         type: [Schema.Types.ObjectId],
         ref: 'Thought',
      },
      friends: {
         type: [Schema.Types.ObjectId],
         ref: 'User',
      },
   },
   {
      timestamps: true,
      _id: true
   }
)

userSchema.virtual('friendCount').get(function (this: IUsers) {
   return this.friends?.length;
})

const User = model('user', userSchema);

export default User;