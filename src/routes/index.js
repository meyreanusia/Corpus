import express  from "express";
import textos from "./textoRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("classificacao de Texto"));
    app.use(express.json(), textos);
};

export default routes;