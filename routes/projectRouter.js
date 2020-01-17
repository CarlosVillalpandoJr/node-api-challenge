const express = require('express')
const router = express.Router()

const Projects = require('../data/helpers/projectModel');


// GET requests

router.get('/', async (req, res) => {
    try {
        const AllProjects = await Projects.get()
        res.status(200).json(AllProjects)
    } catch {
        res.status(500).json({ error: 'Could not retrieve projects from DB' })
    }
})

router.get('/:id', validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const ProjectActions = await Projects.getProjectActions(id)
        res.status(200).json(ProjectActions)
    } catch {
        res.status(500).json({ error: 'Could not get project actions from database' })
    }
})

// POST

router.post('/', async (req, res) => {
    const projectData = req.body
    try {
        const NewProject = await Projects.insert(projectData)
        res.status(201).json(NewProject)
    } catch {
        res.status(500).json({ error: 'Could not add project to database' })
    }
})

// PUT 

router.put('/:id', validateId, async (req, res) => {
    const { id } = req.params;
    const projectBody = req.body;
    try {
        const UpdatedProject = await Projects.update(id, projectBody)
        // strange
        res.status(204).json({ updated: projectBody, UpdatedProject })
    } catch {
        res.status(500).json({ error: 'Could not updated project information' })
    }
})

// DELETE

router.delete('/:id', validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteProject = await Projects.remove(id)
        // strange
        res.status(200).json({ message: `Project with id ${id} has been deleted`, DeleteProject })
    } catch {
        res.status(500).json({ error: 'Could not delete project from database' })
    }
})



function validateId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project) {
                req.project = project
                next()
            } else {
                res.status(400).json({ errorMessage: 'Project with ID does not exist' })
            }
        })
}


module.exports = router;