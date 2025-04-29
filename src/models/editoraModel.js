const pool = require("../config/database");
const { get } = require("../routes/editoraRoutes");

const getAllEditoras = async () => {
    const result = await pool.query("SELECT * FROM editoras");
    return result.rows;
};

const getEditoraById = async (id) => {
    try {
        const result = await pool.query(`
            SELECT * FROM editoras WHERE id = $1
        `, [id]);

        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar editora por ID:', error);
        throw error;
    }
};

const createEditora = async (name, founder) => {
    const result = await pool.query(
        "INSERT INTO editoras (name, founder) VALUES ($1, $2) RETURNING *",
        [name, founder]
    );
    return result.rows[0];
};

const updateEditora = async (id, data) => {
    const { name, founder } = data;
    const result = await pool.query(
        "UPDATE editoras SET name = $1, founder = $2 WHERE id = $3 RETURNING *",
        [name, founder, id]
    );
    return result.rows[0];
};

const deleteEditora = async (id) => {
    const result = await pool.query(
        "DELETE FROM editoras WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rowCount === 0) {
        return { error: "Editora não encontrada." };
    }
    return { message: "Editora deletada com sucesso." };
};

module.exports = {
    getAllEditoras,
    getEditoraById,
    createEditora,
    updateEditora,
    deleteEditora,
};