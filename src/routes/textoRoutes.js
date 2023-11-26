import express  from "express";
import TextoController from "../controllers/textoController.js";
import multer from "multer";
import cors from "cors";

const multerConfig = multer()
const routes = express.Router();

routes.use(cors({
    origin: "http://seu-domínio-permitido.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Habilita o uso de credenciais (cookies, por exemplo)
  }));

routes.use(cors());

routes.get("/classificacao",TextoController.listarTexto);
routes.post("/classificacao",  multerConfig.single("file"), TextoController.cadastrarTexto);
routes.put("/classificacao/:id", TextoController.atualizarClassificacaoTexto);
routes.delete("/classificacao/:id", TextoController.excluirTexto)
export default routes;