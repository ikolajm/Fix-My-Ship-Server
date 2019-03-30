const router = require('express').Router(),
      Question = require('../../models/Question');


// Create question
router.post('/create', (req, res) => {
    Question.create({
        content: req.body.content,
        upvotes: 0,
        owner: {
            id: req.user.id,
            username: req.user.username
        },
        comments: []
    })
    .then(createdQuestion => {
        res.json({
            question: createdQuestion,
            message: 'Successfully created question!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

// Edit question 
router.put('/edit/:id', (req, res) => {
    Question.findByIdAndUpdate(req.params.id,
        {
            content: req.body.content
        }
    )
    .then(updatedQuestion => {
        res.json({
            message: 'Question successfully updated!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

// Upvote
// router.put('/edit/:id', (req, res) => {
//     Question.findByIdAndUpdate(req.params.id,
//         {
//             upvotes: req.body.content
//         }
//     )
//     .then(updatedQuestion => {
//         res.json({
//             message: 'Question successfully updated!'
//         })
//     })
//     .catch(err => res.json({message: err.message}))
// })

// // Downvote
// router.put('/edit/:id', (req, res) => {
//     Question.findByIdAndUpdate(req.params.id,
//         {
//             content: req.body.content
//         }
//     )
//     .then(updatedQuestion => {
//         res.json({
//             message: 'Question successfully updated!'
//         })
//     })
//     .catch(err => res.json({message: err.message}))
// })

// Delete question
router.delete('/delete/:id', (req, res) => {
    Question.findByIdAndDelete(req.params.id)
    .then(deleted => {
        res.json({
            message: 'Question successfully deleted!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

module.exports = router;