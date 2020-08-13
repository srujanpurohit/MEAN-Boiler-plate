const express = require('express');
const router = express.Router();
module.exports = router;

const asyncHandler = require('express-async-handler');
const roleController = require('../controllers/role.controller');
const findQueryValidator = require('../validators/findQueryValidator');
const {
  addAndPutValidator,
  patchValidator
} = require('../validators/roleSchema.validators');
const isMongoObjectId = require('../validators/mongoObjectId.validator');
const hasModuleRightsMiddleware = require('../middlewares/hasModuleRights.middleware');

// for checking if user has module rights. can also be added to individual Route
router.use(hasModuleRightsMiddleware('role', 'read'));

router.post(
  '/',
  asyncHandler(async (req, res) => {
    roleData = addAndPutValidator(req.body);
    let role = await roleController.add(roleData);
    return res.send(role);
  })
);
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const queryParams = findQueryValidator(req.query);
    let roles = await roleController.find(queryParams);
    return res.send(roles);
  })
);
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const _id = isMongoObjectId(req.params.id);
    let role = await roleController.findOne({ _id });
    return res.send(role);
  })
);
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const data = addAndPutValidator(req.body);
    const _id = isMongoObjectId(req.params.id);
    let role = await roleController.updateOneById(_id, data);
    return res.send(role);
  })
);

// This will require additional validation logic for patching moduleRights based on current values
/* router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const data = patchValidator(req.body);
    const _id = isMongoObjectId(req.params.id);
    let role = await roleController.updateOneById(_id, data);
    return res.send(role);
  })
); */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const _id = isMongoObjectId(req.params.id);
    let role = await roleController.delete({ _id });
    return res.send(role);
  })
);
