const router = require('express').Router(),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      User = require('../../models/User');

// Signup
router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        questions: [],
        comments: [],
        karma: 0
    })
    .then(createdUser => {
        let token = jwt.sign( { _id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );

        res.json({
            user: createdUser,
            token: token,
            message: 'User successfully created, welcome!'
        })
    }) 
    .catch(err => console.log(err.message));
})

// Signin
router.post('/signin', (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .then(found => {
        bcrypt.compare(req.body.password, found.password, (err, match) => {
            if (match) {
                let token = jwt.sign( { _id: found._id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 } );

                res.json({
                    user: found,
                    token: token,
                    message: 'Successfully logged in!'
                })
            } else {  
                res.send(err => res.json({
                    message: 'Password does not match the provided username!'
                }))
            }
        })
    })
    .catch(err => res.json({message: 'User not found with provided username!'}))
})

// View single user
router.get('/:id', (req, res) => {
    User.findOne({
        _id: req.params.id
    })
    .populate('question, comment')
    .exec((err, result) => {
        if (err) {
            console.log(err);
            res.json({
                message: err.message
            })
        } else {
            res.json({
                results: result,
                message: 'User successfully found!'
            })
        }
    })
    
})


module.exports = router;