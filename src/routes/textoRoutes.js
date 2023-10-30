import express  from "express";
import TextoController from "../controllers/textoController.js";

const routes = express.Router();

routes.get("/classificacao", TextoController.listarTexto);
routes.post("/classificacao", TextoController.cadastrarTexto);
routes.put("/classificacao/:id", TextoController.atualizarClassificacaoTexto);
routes.delete("/classificacao/:id", TextoController.excluirTexto)
export default routes;