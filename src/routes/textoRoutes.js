import express  from "express";
import TextoController from "../controllers/textoController.js";
import multer from "multer";
import texto from "../models/Textos.js";
import cors from "cors";
import { createObjectCsvWriter } from 'csv-writer';
const multerConfig = multer()
const routes = express.Router();

routes.use(cors({

    origin: "http://127.0.0.1:5500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
  }));


routes.get("/classificacao", cors(), TextoController.listarTexto);
routes.get("/classificacao/:documentoId", cors(), TextoController.getTextoPorDocumentoId);
routes.post("/classificacao",  multerConfig.single("file"), cors(), TextoController.cadastrarTexto);
routes.put("/classificacao/:id", cors(),  TextoController.atualizarClassificacaoTexto);
routes.delete("/classificacao/:documentoId", cors(),  TextoController.excluir);

routes.get('/download-csv/:documentoId', async (req, res) => {

  const {documentoId} = req.params;
  try {
    const csvWriter = createObjectCsvWriter({
      path: `rotulo_documento_${documentoId}.csv`,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'texto', title: 'Texto' },
        { id: 'classificacao', title: 'Rótulo' },

      ],
    });

    const dadosTabela = await texto.find({documentoId});

    csvWriter.writeRecords(dadosTabela)
      .then(() => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=output.csv');
        res.download(`rotulo_documento_${documentoId}.csv`);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Erro ao gerar o arquivo CSV' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar o arquivo CSV' });
  }
});


export default routes;