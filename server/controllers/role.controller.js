const Role = require('../models/role.model');

module.exports = {
  add: data => {
    return new Role(data).save();
  },
  find: ({ query, options }) => {
    return Role.paginate(query, options);
  },
  findOne: query => {
    return Role.findOne(query);
  },
  updateOneById: async (_id, data) => {
    const role = await Role.findOneAndUpdate({ _id }, data, {
      new: true
    }).lean();
    if (!role) throw createHttpError(400, `Role not found id ${_id}`);
    return role;
  },
  updateMany: (query, data) => {
    return Role.updateMany(query, data);
  },
  delete: _id => {
    return Role.deleteOne({ _id });
  }
};
