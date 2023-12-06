import express  from "express";
import textos from "./textoRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Classificacao de Texto"));
    app.use(express.json(), textos);
    // app.use(express.static(path.join(__dirname, "web")));
    // app.use('/web', express.static('web', { 'extensions': ['html', 'js'], 'index': 'index.html' }));
};

export default routes;