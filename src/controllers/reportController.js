const PDFDocument = require("pdfkit");

const heroisModel = require("../models/heroisModel");
const editoraModel = require("../models/editoraModel");

// Gera relatório de heróis
const exportHeroisPDF = async (req, res) => {
    try {
        const herois = await heroisModel.getAllHerois();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=herois.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(30).text("Relatório de Heróis", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(18).text("Id | Nome | Foto", { underline: true });
        doc.moveDown(0.5);

        // Adiciona os dados dos heróis
        herois.forEach((heroi) => {
            doc.text(`${heroi.id} | ${heroi.name} | ${heroi.photo}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de heróis" });
    }
};

// Gera relatório de editoras
const exportEditorasPDF = async (req, res) => {
    try {
        const editoras = await editoraModel.getAllEditoras();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=editoras.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(30).text("Relatório de Editoras", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(18).text("Id | Nome | Fundador", { underline: true });
        doc.moveDown(0.5);

        // Adiciona os dados das editoras
        editoras.forEach((editora) => {
            doc.text(`${editora.id} | ${editora.name} | ${editora.founder}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF de editoras" });
    }
};

module.exports = {
    exportHeroisPDF,
    exportEditorasPDF,
};