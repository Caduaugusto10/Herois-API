const pool = require("../config/database");

const getAllEditoras = async () => {
    const result = await pool.query("SELECT * FROM editoras");
    return result.rows;
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
    createEditora,
    updateEditora,
    deleteEditora,
};