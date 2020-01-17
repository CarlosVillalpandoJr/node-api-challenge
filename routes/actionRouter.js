const express = require('express');
const router = express.Router();

const Actions = require('../data/helpers/actionModel');

// GET 

router.get('/', async (req, res) => {
    try {
        const AllActions = await Actions.get()
        res.status(200).json(AllActions) 
    } catch {
        res.status(500).json({ error: 'Could not get project actions' })
    }
})

// POST

router.post('/', validateId, async (req, res) => {
    const actionBody = req.body;
    const { id } = req.params;
    try {
        const AddAction = await Actions.insert(actionBody)
        // how to send new post?
        res.status(201).json(AddAction)
    } catch {
        res.status(500).json({ error: 'Could not add action to database' })
    }
})

// Update

router.put('/:id', validateId, async (req, res) => {
    const actionBody = req.body;
    const { id } = req.params;
    try {
        const UpdatedAction = await Actions.update(id, actionBody)
        res.status(204).json(UpdatedAction)
    } catch {
        res.status(500).json({ error: 'Could not update action' })
    }
})

// Delete

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const DeletedProject = await Actions.remove(id)
        res.status(200).json({  message: "Project was deleted "})
    } catch {
        res.status(500).json({ error: "Could not delete action" })
    }
})




function validateId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if(action) {
                req.action = action
                next()
            } else {
                res.status(400).json({ errorMessage: 'Action with ID does not exist' })
            }
        })
}


module.exports = router;