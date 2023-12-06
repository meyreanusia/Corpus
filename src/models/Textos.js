import mongoose  from "mongoose";


const textoSchema = new mongoose.Schema({
    texto: {type: String, require: true},
    classificacao: {type: String},
    documentoId: { type: String, required: true },
}, {versionKey: false});



const texto = mongoose.model("texto", textoSchema);
export default texto;