import express  from "express";
import textos from "./textoRoutes.js";
import cors from 'cors';

const routes = (app) => {
    app.use(cors())
    app.route("/").get((req, res) => res.status(200).send("Rotulagem de Texto"));
    app.use(express.json(), textos);

};

export default routes;