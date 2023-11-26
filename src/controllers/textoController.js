import texto from "../models/Textos.js";
import {Readable} from 'stream';
import readline from "readline"
import mongoose from 'mongoose';

class TextoController {

  static async listarTexto(req, res) {
    try{
    const listaTextos= await texto.find({});
    res.status(200).json(listaTextos);
    }catch(error){
        res.status(500).json({message: `${error.message}- Falha na requisição`})
    }
  }

  static async cadastrarTexto(req, res) {
    try {
      const { file } = req;
      const { buffer } = file;

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);

      const productsLine = readline.createInterface({
        input: readableFile
      });

      const products = [];

      for await (const line of productsLine) {
        const productLineSplit = line.split(";");

        const product = {
          texto: productLineSplit[1],
          classificacao: '' 
        };

        products.push(product);
        const novoTexto = await texto.create(product);
        console.log(`Produto salvo no banco de dados: ${novoTexto}`);
      }

      return res.status(200).json({ message: "Produtos cadastrados com sucesso", products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cadastrar produtos" });
    }
  }

  static async atualizarClassificacaoTexto(req, res){
    try{
      const id = req.params.id;
      // console.log(id);

      await texto.findByIdAndUpdate(id, { classificacao: req.body.classificacao });
      res.status(200).json({message: "texto atualizado"})
    }catch(error){
        res.status(500).json({})
    }
  }

  static async excluirTexto(req, res){
    try{
      const id = req.params.id;
      await texto.findByIdAndDelete(id);
      res.status(200).json({ message: `texto excluido com sucesso`})
    }catch(error){
      res.status(500).json({ message: `${error.message} - falha na exclusão`})
    }
  }
};

export default TextoController;
