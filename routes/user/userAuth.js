const router = require('express').Router(),
      User = require('../../models/User');

// Edit user
router.put('/edit/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, 
        {
            username: req.body.username,
            email: req.body.email
        }
    )
    .then(updated => {
        res.json({
            message: 'User successfully updated!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

// Delete user
router.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(deleted => {
        res.json({
            message: 'User successfully deleted!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

module.exports = router;