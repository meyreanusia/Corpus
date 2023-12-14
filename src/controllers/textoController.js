import texto from "../models/Textos.js";
import {Readable} from 'stream';
import readline from "readline";
import { v4 as uuidv4 } from 'uuid'; 
import { log } from "console";

class TextoController {

  static async listarTexto(req, res) {
    try{
    const listaTextos= await texto.find({});
    res.status(200).json(listaTextos);
    }catch(error){
        res.status(500).json({message: `${error.message}- Falha na requisição`})
    }
  }

  static async getTextoPorDocumentoId(req, res) {

    try {
      const { documentoId } = req.params;
      const listaTextos = await texto.find({ documentoId });

      return res.status(200).json({ message: "Textos encontrados com sucesso", listaTextos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar textos por documentoId" });
    }
  }
  static async cadastrarTexto(req, res) {
    try {
      const { file } = req;
      const { buffer } = file;
      // console.log(file);
      // console.log(buffer);

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);

      const productsLine = readline.createInterface({
        input: readableFile
      });
      const products = [];
      let documentoId =  uuidv4();
      let primeiraLinha = true;


      for await (const line of productsLine) {

        if (primeiraLinha) {
          primeiraLinha = false;
          continue;  
        }
        // const productLineSplit = line.split(/[;,]/);
        const delimiter = line.match(/[,;]/)[0];

        const [id, textoDocumento] = line.split(new RegExp(`${delimiter}(?=(?:[^"]*"[^"]*")*[^"]*$)`));
        
        const product = {
          texto: textoDocumento,
          classificacao: '',
          documentoId: documentoId, 
        };
        console.log(product);
        console.log(id);
        products.push(product);
        const novoTexto = await texto.create(product);
      }

      return res.status(200).json({ message: "Produtos cadastrados com sucesso", products, documentoId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar produtos" });
    }
  }

  static async atualizarClassificacaoTexto(req, res){
    try{
      const id = req.params.id;
      await texto.findByIdAndUpdate(id, { classificacao: req.body.classificacao });
      res.status(200).json({message: "texto atualizado"})
    }catch(error){
        res.status(500).json({})
    }
  }


  static async excluir(req, res) {

    try {
      const { documentoId } = req.params;
      const textoParaExcluir = await texto.deleteMany({ documentoId });
      console.log(textoParaExcluir);
      if (!textoParaExcluir) {
        return res.status(404).json({ message: "Texto não encontrado para exclusão" });
      }
      return res.status(200).json({ message: "Texto excluído com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao excluir texto por ID" });
    }
  }

};

export default TextoController;
