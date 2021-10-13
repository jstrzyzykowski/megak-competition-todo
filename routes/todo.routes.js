const express = require('express');
const {getTodosFromDatabase} = require('../utils');

const todoRouter = express.Router();

todoRouter
  .get('/todos', async (req, res) => {
    // res.send('GET wszystkie todosy');
    const todos = await getTodosFromDatabase();
    res.json(todos);
})
  .patch('/todo/:todoId', (req, res) => {

    // getDataFromDatabase


    res.status(204);
    // Czy end musi byc?
    res.end();
  })



// /todo/:todoId/
// PUT - update todosa (completed, title)
// DELETE - usuniecie todosa o id
// *opcjonalnie GET
// /todo/create
// POST

module.exports = {
  todoRouter,
}