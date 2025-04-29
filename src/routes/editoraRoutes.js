const express = require('express');
const router = express.Router();
const editoraController = require('../controllers/editoraController.js');
const apiKeyMiddleware = require('../config/apiKey.js');

router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Editoras
 *   description: Gerenciamento de editoras
 */

/**
 * @swagger
 * /api/editoras:
 *   get:
 *     summary: Lista todas as editoras
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Lista de editoras
 */
router.get('/', editoraController.getAllEditoras);

/**
 * @swagger
 * /api/editoras/{id}:
 *   get:
 *     summary: Busca uma editora por ID
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Editora encontrada
 *       404:
 *         description: Editora não encontrada
 */
router.get('/:id', editoraController.getEditoraById);

/**
 * @swagger
 * /api/editoras:
 *   post:
 *     summary: Cria uma nova editora
 *     tags: [Editoras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founder:
 *                 type: string
 *     responses:
 *       201:
 *         description: Editora criada
 */
router.post('/', editoraController.createEditora);

/**
 * @swagger
 * /api/editoras/{id}:
 *   put:
 *     summary: Atualiza uma editora
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               founder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Editora atualizada
 */
router.put('/:id', editoraController.updateEditora);

/**
 * @swagger
 * /api/editoras/{id}:
 *   delete:
 *     summary: Deleta uma editora
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Editora deletada
 */
router.delete('/:id', editoraController.deleteEditora);

module.exports = router;