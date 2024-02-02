const { json, Router } = require('express')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Routes
module.exports.signup_get = (req, res) => {
   res.send('Signup Page')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });
    let token = jwt.sign({_id: user._id}, 'ao-thu-lanh-leo-nuoc-trong-veo')
    res.cookie('jwt', token, { httpOnly: true, maxAge: 7776000 })
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};


module.exports.login_get = async (req, res) => {
    res.send('login Page')
}



module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Required both email and password")
    }
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send("No account found with that email address!")
        }
        let validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).send("Invalid email or password.");
        }
        let token = jwt.sign({_id: user._id}, 'ao-thu-lanh-leo-nuoc-trong-veo')
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

