const express = require('express');
const router = express.Router();
module.exports = router;
const asyncHandler = require('express-async-handler');

const UserController = require('../controllers/user.controller');
const userSchemaValidators = require('../validators/userSchema.validators');
const isMongoObjectId = require('../validators/mongoObjectId.validator');
const findQueryValidator = require('../validators/findQueryValidator');
const jwt = require('passport').authenticate('jwt', { session: false });
const hasModuleRights = require('../middlewares/hasModuleRights.middleware');

const moduleName = 'user';

router.patch(
  '/changePassword',
  asyncHandler(async (req, res) => {
    /* add your user verification logic here */

    return res.send('Not implemented');
  })
);

router.get('/me', jwt, (req, res) => {
  res.send(req.user); // for more details fetch user from DB
});

router.post(
  '/',
  jwt,
  hasModuleRights(moduleName, 'delete'),
  asyncHandler(async (req, res) => {
    const data = userSchemaValidators.addValidator(req.body);
    const response = await UserController.add(data);
    delete response.password;
    return res.send(response);
  })
);
router.get(
  '/',
  jwt,
  hasModuleRights(moduleName, 'read'),
  asyncHandler(async (req, res) => {
    const user = await UserController.find(findQueryValidator(req.query));
    return res.send(user);
  })
);
router.get(
  '/:id',
  jwt,
  hasModuleRights(moduleName, 'read'),
  asyncHandler(async (req, res) => {
    const _id = isMongoObjectId(req.params.id);
    const user = await UserController.findOne({ _id });
    return res.send(user);
  })
);
router.put(
  '/:id',
  jwt,
  hasModuleRights(moduleName, 'update'),
  asyncHandler(async (req, res) => {
    const data = userSchemaValidators.putValidator(req.body);
    const _id = isMongoObjectId(req.params.id);
    const user = await UserController.updateOneById(_id, data);
    return res.send(user);
  })
);
router.patch(
  '/:id',
  jwt,
  hasModuleRights(moduleName, 'update'),
  asyncHandler(async (req, res) => {
    const data = userSchemaValidators.patchValidator(req.body);
    const _id = isMongoObjectId(req.params.id);
    const user = await UserController.updateOneById(_id, data);
    return res.send(user);
  })
);

router.delete(
  ':id',
  jwt,
  hasModuleRights(moduleName, 'delete'),
  asyncHandler(async (req, res) => {
    const _id = isMongoObjectId(req.params.id);
    const deleteResult = await UserController.delete({ _id });
    res.send(deleteResult);
  })
);
