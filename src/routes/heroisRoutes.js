const express = require('express');
const router = express.Router();
const heroisController = require('../controllers/heroisController.js');
const apiKeyMiddleware = require('../config/apiKey.js');

// Middleware para validação da API Key
router.use(apiKeyMiddleware);

/**
 * @swagger
 * tags:
 *   name: Heróis
 *   description: Gerenciamento de heróis
 */

/**
 * @swagger
 * /api/herois:
 *   get:
 *     summary: Lista todos os heróis
 *     tags: [Heróis]
 *     responses:
 *       200:
 *         description: Lista de heróis
 */
router.get('/', heroisController.getAllHerois);

/**
 * @swagger
 * /api/herois/{id}:
 *   get:
 *     summary: Busca um herói por ID
 *     tags: [Heróis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Herói encontrado
 *       404:
 *         description: Herói não encontrado
 */
router.get('/:id', heroisController.getHeroiById);

/**
 * @swagger
 * /api/herois:
 *   post:
 *     summary: Cria um novo herói
 *     tags: [Heróis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Herói criado
 */
router.post('/', heroisController.createHeroi);

/**
 * @swagger
 * /api/herois/{id}:
 *   put:
 *     summary: Atualiza um herói
 *     tags: [Heróis]
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
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Herói atualizado
 */
router.put('/:id', heroisController.updateHeroi);

/**
 * @swagger
 * /api/herois/{id}:
 *   delete:
 *     summary: Deleta um herói
 *     tags: [Heróis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Herói deletado
 */
router.delete('/:id', heroisController.deleteHeroi);

module.exports = router;