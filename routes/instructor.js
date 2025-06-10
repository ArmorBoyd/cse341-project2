const router = require('express').Router();

const getInstructorController = require('../controllers/instructors');

router.get('/', getInstructorController.getAllInstructors);
router.get('/:id', getInstructorController.getInstructorBy);
router.post('/', isAuthenticated, getInstructorController.postInstructor);
router.put('/:id', isAuthenticated, getInstructorController.putInstructor);
router.delete('/:id', isAuthenticated, getInstructorController.deleteInstructor);

module.exports = router;

