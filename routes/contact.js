const express = require('express');
const router = express.Router();
const {getAllContacts, addContacts, editContacts,AddInstructorName,GetInstructorName,schedulelecture} = require('../controller/contact')
const upload = require('../middlewares/multer');

router.get('/',getAllContacts);
router.post('/add', upload.single('image'), addContacts);
router.put('/:id',upload.single('image'),editContacts);
router.post('/AddInstructorName', upload.single('image'), AddInstructorName);
router.get('/GetInstructorName', GetInstructorName);
router.post('/schedulelecture', schedulelecture);

module.exports = router