const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'User name is required',
    },
    email: {
      type: String,
      required: 'Email address is required',
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address'],
    },
    thoughts:[ {
      type: Schema.Types.ObjectID,
      ref: 'Thought',
      },
     ],
     friends:[ {
      type: Schema.Types.ObjectID,
      ref: 'User',
      },
     ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
