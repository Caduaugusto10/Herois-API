const heroisModel = require('../models/heroisModel');

const getAllHerois = async (req, res) => {
    try {
        const herois = await heroisModel.getHerois();
        res.json(herois);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar heróis.' });
    }
};

const getHeroiById = async (req, res) => {
    const { id } = req.params;
    try {
        const heroi = await heroisModel.getHeroiById(id);
        if (!heroi) {
            return res.status(404).json({ error: 'Herói não encontrado.' });
        }
        res.json(heroi);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar herói.' });
    }
};

const createHeroi = async (req, res) => {
    const { name, photo } = req.body;
    try {
        const newHeroi = await heroisModel.createHeroi(name, photo);
        res.status(201).json(newHeroi);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar herói.' });
    }
};

const updateHeroi = async (req, res) => {
    const { id } = req.params;
    const { name, photo } = req.body;
    try {
        const updatedHeroi = await heroisModel.updateHeroi(id, name, photo);
        if (!updatedHeroi) {
            return res.status(404).json({ error: 'Herói não encontrado.' });
        }
        res.json(updatedHeroi);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar herói.' });
    }
};

const deleteHeroi = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await heroisModel.deleteHeroi(id);
        if (result.error) {
            return res.status(404).json({ error: result.error });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar herói.' });
    }
};

module.exports = {
    getAllHerois,
    getHeroiById,
    createHeroi,
    updateHeroi,
    deleteHeroi,
};