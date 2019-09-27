const { Router } = require('express');
const router = Router();

const User = require('../models/User');

router.post('/signUp', async (req, res, next) => {
    const { username, email, password } = req.body;
   const user = new User ({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
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