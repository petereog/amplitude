const express = require('express');
const { validate } = require('../middleware/validation');
const schemas = require('../utils/validators');
const dataController = require('../controllers/dataController');

const router = express.Router();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

/**
 * Data endpoints
 */
router.post('/data', 
  validate(schemas.submitData),
  dataController.submitData
);

router.get('/data', dataController.getData);

module.exports = router;
