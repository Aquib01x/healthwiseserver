const express = require('express')

const { loginUser, signupUser,changePassword,resetPassword,requestPasswordReset } = require('../APILogic/userRoutesLogic')

const authenticateRequest = require('../APIMiddleware/authenticateRequest')


const router = express.Router()





router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/change-password', authenticateRequest, changePassword);


router.post('/request-password-reset',requestPasswordReset);//no auth
router.post('/reset-password',resetPassword);//no auth, special token


module.exports = router