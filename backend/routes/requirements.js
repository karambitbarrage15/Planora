const express = require('express');
const router = express.Router();
const {
  createRequirement,
  getRequirements,
  getRequirement
} = require('../controllers/requirementController');

router.route('/')
  .get(getRequirements)
  .post(createRequirement);

router.route('/:id')
  .get(getRequirement);

module.exports = router;
