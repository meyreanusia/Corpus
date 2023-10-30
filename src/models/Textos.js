import mongoose  from "mongoose";

const textoSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.ObjectId},
    texto: {type: String, require: true},
    classificacao: {type: String},
}, {versionKey: false});

const texto = mongoose.model("texto", textoSchema);
export default texto;