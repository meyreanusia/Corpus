import express  from "express";
import TextoController from "../controllers/textoController.js";
import multer from "multer";
import cors from "cors";

const multerConfig = multer()
const routes = express.Router();

routes.use(cors({

    origin: "http://127.0.0.1:5500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
  }));

// routes.use(cors());

routes.get("/classificacao", cors(), TextoController.listarTexto);
routes.post("/classificacao",  multerConfig.single("file"), TextoController.cadastrarTexto);
routes.put("/classificacao/:id", cors(),  TextoController.atualizarClassificacaoTexto);
routes.delete("/classificacao/:id",  cors(), TextoController.excluirTexto)
export default routes;