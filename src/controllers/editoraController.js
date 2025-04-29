const editoraModel = require('../models/editoraModel');

const getAllEditoras = async (req, res) => {
    try {
        const editoras = await editoraModel.getAllEditoras();
        res.json(editoras);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar editoras.' });
    }
};

const getEditoraById = async (req, res) => {
    const { id } = req.params; 
    try {
        const editora = await editoraModel.getEditoraById(id);
        if (!editora) {
            return res.status(404).json({ error: 'Editora não encontrada.' });
        }
        res.json(editora);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar editora.' });
    }
};

const createEditora = async (req, res) => {
    const { name, founder } = req.body;
    try {
        const newEditora = await editoraModel.createEditora(name, founder);
        res.status(201).json(newEditora);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar editora.' });
    }
};

const updateEditora = async (req, res) => {
    const { id } = req.params;
    const { name, founder } = req.body;
    try {
        const updatedEditora = await editoraModel.updateEditora(id, { name, founder });
        if (!updatedEditora) {
            return res.status(404).json({ error: 'Editora não encontrada.' });
        }
        res.json(updatedEditora);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar editora.' });
    }
};

const deleteEditora = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await editoraModel.deleteEditora(id);
        if (result.error) {
            return res.status(404).json({ error: result.error });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar editora.' });
    }
};

module.exports = {
    getAllEditoras,
    getEditoraById,
    createEditora,
    updateEditora,
    deleteEditora,
};