const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')


//register api
router.post('/register', userController.register)
//login api
router.post('/login', userController.login)
//add project api
router.post('/add-project', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)
// router-level middleware

//get home project api      no authorization required
router.get('/get-home-project', projectController.getHomeProject)
//get all project api     authorization required
router.get('/get-all-project', jwtMiddleware, projectController.getAllProject)
//get user project api             authorization required
router.get('/get-user-project', jwtMiddleware, projectController.getUserProject)
//update user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
//edit or update project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("profileImage"),projectController.editProject)

//remove project
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)

//exporting router
module.exports = router