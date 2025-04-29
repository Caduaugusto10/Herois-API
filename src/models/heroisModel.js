const pool = require("../config/database");

const getHerois = async (name) => {
    if (!name) {
        const result = await pool.query(`
            SELECT * FROM herois
        `);
        return result.rows;
    } else {
        const result = await pool.query(`
            SELECT * FROM herois WHERE name ILIKE $1
        `, [`%${name}%`]);
        return result.rows;
    }
};

const getHeroiById = async (id) => {
    const result = await pool.query(`
        SELECT * FROM herois WHERE id = $1
    `, [id]);

    return result.rows[0];
};

const createHeroi = async (name, photo) => {
    const result = await pool.query(`
        INSERT INTO herois (name, photo) VALUES ($1, $2) RETURNING *
    `, [name, photo]);
    return result.rows[0];
};

const updateHeroi = async (id, name, photo) => {
    const result = await pool.query(`
        UPDATE herois SET name = $1, photo = $2 WHERE id = $3 RETURNING *
    `, [name, photo, id]);
    return result.rows[0];
};

const deleteHeroi = async (id) => {
    const result = await pool.query(`
        DELETE FROM herois WHERE id = $1 RETURNING *
    `, [id]);
    if (result.rowCount === 0) {
        return { error: "Herói não encontrado." };
    }
    return { message: "Herói deletado com sucesso." };
};

module.exports = { 
    getHerois,
    getHeroiById,
    createHeroi, 
    updateHeroi, 
    deleteHeroi 
};