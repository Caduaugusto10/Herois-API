const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.get('/heroi/pdf', reportController.exportHeroisPDF);

router.get('/editoras/pdf', reportController.exportEditorasPDF);

module.exports = router;