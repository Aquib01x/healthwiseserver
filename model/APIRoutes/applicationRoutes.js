const express = require('express')

const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const { getAllApplications, 
    getSingleApplication,
    createApplication,
    deleteApplication,
    updateApplication} = require('../APILogic/applicationRoutesLogic')

const authenticateRequest = require('../APIMiddleware/authenticateRequest')

const router = express.Router()



const Sanitize = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name must not be empty.'),
  body('desc').trim().optional({ checkFalsy: true }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const getRateLimit = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 100, // Limit each IP to 100 requests per 30 minutes
    standardHeaders: true, 
    message: "Too many requests from this IP, please try again after 30 minutes"
  });
      


router.get('/',authenticateRequest,getAllApplications)

router.get('/:id',getRateLimit,getSingleApplication)


router.post('/',authenticateRequest,Sanitize,createApplication)


router.delete('/:id',authenticateRequest,deleteApplication)


router.patch('/:id',authenticateRequest,updateApplication)    


module.exports = router

