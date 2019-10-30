const express = require('express');

const server = express();

server.use(express.json());

const projetos = [
   {
    id: "1",
    title: "Primeiro Projeto",
    tasks: ["Primera tarefa", "MUsica"]
  },
  {
    id: "2",
    title: "Segunda Projeto",
    tasks: ["Segunda tarefa"]
  }
];
let cont = 0;
server.use((req, res, next) => {
  cont += 1;
  console.log(`foram feitas ${cont} requisicoes`);
  next();

});

function CheckExistis(req, res, next){
  const projeto = projetos[req.params.index];
  if (!projeto){
    return res.status(400).json({error: 'O Projeto não existe!'});
  }

  req.projetos = projetos;

  return next();
}

server.get('/projects', (req, res) => {  
  return res.json(projetos);
});

server.get('/projects/:index', CheckExistis, (req, res) => {
  const {index} = req.params;
  return res.json(projetos[index]);
});

server.post( '/projects', (req, res) => {
  const { id , title } = req.body;
  const arraynovo = {id, title, tasks: []};
  projetos.push(arraynovo); 
  return res.json(projetos);
});

server.put('/projects/:index', CheckExistis, (req, res) => {
  const {index}= req.params;
  const {title} = req.body;
  projetos[index].title = title;
  return res.json(projetos);
});

server.delete('/projects/:index', (req, res) => {
  const {index} = req.params;
  projetos.splice(index, 1);
  return res.send();
});

server.post('/projects/:index/tasks', (req, res) => {
  const {index} = req.params;
  const {title}= req.body;

  projetos[index].tasks.push(title);

  return res.json(projetos);
});

server.listen(4000);