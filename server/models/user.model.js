const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'A user already exists with this email address'],
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email'
      ],
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
