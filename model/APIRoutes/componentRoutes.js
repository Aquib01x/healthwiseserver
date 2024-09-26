const express = require('express');

const rateLimit = require('express-rate-limit');


const {
  addComponent,
  getComponents,
  updateComponent,
  deleteComponent,
  moveComponent

} = require('../APILogic/componentRoutesLogic');

const authenticateRequest = require('../APIMiddleware/authenticateRequest')

const router = express.Router({ mergeParams: true }); 

const getRateLimit = rateLimit({
  windowMs: 30 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  message: "Too many requests from this IP, please try again after 30 minutes"
});

const { body, validationResult } = require('express-validator');

const SanitizeAddComponent = [
  body('screen').trim().isLength({ min: 1 }).withMessage('Screen must not be empty.'),
  body('type').trim().isLength({ min: 1 }).withMessage('Type must not be empty.'),
  body('content').optional().trim(), 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
    




router.post('/', authenticateRequest, SanitizeAddComponent,addComponent);

// Get all components for a specific application
// No authentication required here
router.get('/',getRateLimit, getComponents);

// Update a specific component of a specific application
router.patch('/:componentId', authenticateRequest, updateComponent);

// Delete a specific component of a specific application
router.delete('/:componentId', authenticateRequest, deleteComponent);

// Move the component up
router.patch('/:componentId/move', authenticateRequest, moveComponent);



module.exports = router;


