require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const editoraRoutes = require("./src/routes/editoraRoutes");
const heroisRoutes = require("./src/routes/heroisRoutes");
const reportRoutes = require("./src/routes/reportRoutes");

const setupSwagger = require('./src/config/swagger'); 

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/editora", editoraRoutes);
app.use("/api/herois", heroisRoutes);
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});