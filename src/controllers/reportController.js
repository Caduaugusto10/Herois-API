const PDFDocument = require("pdfkit");
const heroisModel = require("../models/heroisModel");
const editoraModel = require("../models/editoraModel");
const axios = require("axios");
const fs = require("fs");

const exportHeroisPDF = async (req, res) => {
    try {

        const herois = await heroisModel.getHerois();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=herois.pdf");

        const doc = new PDFDocument({ margin: 30 });
        doc.pipe(res);

        doc.fontSize(24).text("Relatório de Heróis", { align: "center", underline: false });
        doc.moveDown(1);


        doc.fontSize(16).text("Lista de Heróis", { align: "center", underline: false });
        doc.moveDown(0.5);


        for (const heroi of herois) {

            doc.text(` ${heroi.name}`);
            doc.moveDown(0.5);

            if (heroi.photo) {
                try {
                    const response = await axios({
                        url: heroi.photo,
                        method: "GET",
                        responseType: "arraybuffer",
                    });

                    const tempImagePath = `./temp_${heroi.id}.jpg`;
                    fs.writeFileSync(tempImagePath, response.data);

                    doc.image(tempImagePath, {
                        width: 350,
                        height: 200,
                        align: "center",
                        valign: "center",
                    })

                    fs.unlinkSync(tempImagePath); 
                } catch (error) {
                    doc.fontSize(12).fillColor("red").text("Imagem não encontrada.");
                }
            } else {
                doc.fontSize(12).fillColor("red").text("Sem imagem disponível.");
            }

            doc.moveDown(1); 
        }


        doc.end();
    } catch (error) {
        console.error("Erro ao gerar o PDF de heróis:", error);
        res.status(500).json({ error: "Erro ao gerar o PDF de heróis." });
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