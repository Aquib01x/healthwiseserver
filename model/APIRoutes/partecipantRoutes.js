const express = require('express');

const authenticateRequest = require('../APIMiddleware/authenticateRequest')

const router = express.Router(); 
const { body, validationResult } = require('express-validator');


const {
    inviteParticipant,
    getParticipants,
   
  } = require('../APILogic/partecipantsRoutesLogic');



  const SanitizeInvitation = [
    body('email').isEmail().withMessage('Invalid email format').trim().normalizeEmail(),
    body('appId').trim().isLength({ min: 1 }).withMessage('App ID must not be empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

router.post('/invite', authenticateRequest,SanitizeInvitation,inviteParticipant);
router.get('/', authenticateRequest,getParticipants);



module.exports = router;
