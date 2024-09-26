const User = require('../database/userModel')
const jwt = require('jsonwebtoken')
const { SECRET,PASS } = require('../../config')
const bcrypt = require('bcrypt')

const  emailTransporter = require ('./emailTransporter');


const createToken = (_id) => {
  return jwt.sign({_id}, SECRET, { expiresIn: '2h' })
}




const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const changePassword = async (req, res) => {

  const user_id = req.user._id;

  const {oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'The passwords do not match.' });
  }

  try {
      const user = await User.findById(user_id);
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: 'Old password is incorrect.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password updated successfully.' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


const resetPassword = async (req, res) => {



  const { token, newPassword } = req.body;

  try {

    
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ error: 'Invalid token or user does not exist.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Your password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Invalid or expired token.' });
  }
};



const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    const resetToken = createToken(user._id); 

    const resetURL = `https://devweb2023.cis.strath.ac.uk/~fqb19176/healthwisecms/build/index.html#/reset-password/${resetToken}`;
    if (!user) {

      return res.status(404).json({ error: 'User not found.' });
    }

    // Generate a password reset token

    // Send password reset email
  
    await emailTransporter.sendMail({
      from: 'healthwisecms@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      html: `Please click on the following link to reset your password: <a href="${resetURL}">${resetURL}</a>`
    });

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = { signupUser, loginUser,resetPassword, changePassword,requestPasswordReset }