import texto from "../models/Textos.js";

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
      const novoTexto = await texto.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", texto: novoTexto });
    } catch (error) {
      res.status(500).json({ message: `${error.message}} - falha ao cadastrar texto` });
    }
  }

  static async atualizarClassificacaoTexto(req, res){
    try{
      const id = req.params.id;
      await texto.findByIdAndUpdate(id, req.bo);
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
