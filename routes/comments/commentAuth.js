const router = require('express').Router(),
      Comment = require('../../models/Comment');

// Create
router.post('/:playId/comment/create', (req, res) => {
    Comment.create({
        content: req.body.content,
        owner: {
            id: req.user.id,
            username: req.user.username
        },
        parentQuestion: req.params.playId,
        upvotes: 0
    })
    .then(createdComment => {
        res.json({
            comment: createdComment,
            message: 'Comment created successfully!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

// Update
router.put('/comment/edit/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, 
        {
            content: req.body.content
        }
    )
    .then(updatedComment => {
        res.json({
            comment: updatedComment,
            message: 'Comment successfully updated!'
        })
    }) 
    .catch(err => res.json({message: err.message}))
})

// Delete
router.delete('/comment/delete/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(deleted => {
        res.json({
            message: 'Comment successfully deleted!'
        })
    })
    .catch(err => res.json({message: err.message}))
})

module.exports = router;