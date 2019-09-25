const { Router } = require('express');
const router = Router();

const User = require('../models/user');

router.post('/signUp', (req, res, next) => {
    const { username, email, password } = req.body;
   const user = new User ({
        username: username,
        email: email,
        password: password
    });
    console.log(user)
    res.json({message: 'Received'})
});

router.post('/signIn', (req, res, next) => {  
    res.json('signIn');
})

router.get('/me', (req, res, next) => {  
    res.json('me');
})
module.exports = router;