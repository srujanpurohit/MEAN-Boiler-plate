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
    ],
    passwordResetToken: String,
    resetPasswordExpires: Date
  },
  {
    versionKey: false,
    timestamps: true
  }
);

UserSchema.plugin(mongoosePaginate);

/**
 * Get a User based on query with role summary
 * In role summary module rights are based on simple 'OR' logic
 */
UserSchema.statics.UserRoleRightSummary = async function (query) {
  const user = await this.model('User').findOne(query).populate('roles').lean();
  let roleSummary = {
    specialRights: [],
    roleNames: [],
    moduleRights: {}
  };
  user.roles.forEach(role => {
    roleSummary.specialRights.push(...role.specialRights);
    roleSummary.roleNames.push(role.name);
    role.moduleRights.forEach(moduleRight => {
      let summaryModule = roleSummary.moduleRights[moduleRight.module];
      if (summaryModule) {
        summaryModule = {
          // Simple Union of individual Rights
          read: summaryModule.read || moduleRight.rights.read,
          create: summaryModule.create || moduleRight.rights.create,
          update: summaryModule.update || moduleRight.rights.update,
          delete: summaryModule.delete || moduleRight.rights.delete
        };
      } else {
        roleSummary.moduleRights[moduleRight.module] = moduleRight.rights;
      }
    });
  });
  delete user.roles;
  // remove duplicate roles
  roleSummary.specialRights = [...new Set(roleSummary.specialRights)];
  return { ...user, roleSummary };
};

module.exports = mongoose.model('User', UserSchema);
