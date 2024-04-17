const express = require('express');
const {postNotesController, getOneNotesController, deleteNotesController} = require('../controller/notesController');
const router = express.Router();

router.post('/post', postNotesController);
router.post('/getone', getOneNotesController);
router.post('/delete', deleteNotesController);

module.exports = router;