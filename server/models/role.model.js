const mongoose = require('mongoose');
const { modules, specialRights } = require('../config/modulesAndRights');
const mongoosePaginate = require('mongoose-paginate');

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    moduleRights: [
      {
        module: {
          type: String,
          require: true,
          trim: true,
          lowercase: true,
          enum: modules
        },
        rights: {
          read: {
            type: Boolean,
            default: false
          },
          create: {
            type: Boolean,
            default: false
          },
          update: {
            type: Boolean,
            default: false
          },
          delete: {
            type: Boolean,
            default: false
          }
        }
      }
    ],
    specialRights: [{ type: String, enum: specialRights }]
  },
  { versionKey: false, timestamps: true }
);

RoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role', RoleSchema);
