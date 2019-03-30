const router = require('express').Router(),
      Question = require('../../models/Question');

// View all questions
router.get('/', (req, res) => {
    Question.find()
    .populate('comment')
    .exec((err, results) => {
        if (err) {
            console.log(err.message)
            res.json({
                message: err.message
            })
        } else {
            res.json({
                results: results,
                message: 'Question successfully retrieved!'
            })
        }
    })
})

// View single question
router.get('/:id', (req, res) => {
    Question.findById(req.params.id)
    .populate('comment')
    .exec((err, results) => {
        if (err) {
            console.log(err.message)
            res.json({
                message: err.message
            })
        } else {
            res.json({
                results: results,
                message: 'Question successfully retrieved!'
            })
        }
    })
})

module.exports = router;