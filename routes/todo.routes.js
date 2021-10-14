const express = require('express');
const {getTodosFromDatabase, saveTodosIntoDatabase} = require('../utils');
const { v4: uuidv4 } = require('uuid');

const todoRouter = express.Router();

todoRouter
  .get('/todos', async (req, res) => {
    // res.send('GET wszystkie todosy');
    const todos = await getTodosFromDatabase();
    res.json(todos);
})
  .patch('/todo/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const todos = await getTodosFromDatabase();
    todos[todoId] = {...req.body};
    await saveTodosIntoDatabase(todos);
    res.json(todos);
  })
  .post('/todo/create', async (req, res) => {
    const {title} = req.body;
    const todos = await getTodosFromDatabase();
    const todoId = uuidv4();
    todos[`${todoId}`] = {title, completed: false};
    await saveTodosIntoDatabase(todos);
    res.json(todos);
  })
  .delete('/todo/:todoId', async (req, res) => {
    const { todoId } = req.params;
    const todos = await getTodosFromDatabase();
    delete todos[todoId];
    await saveTodosIntoDatabase(todos);
    res.json(todos);
  });


// /todo/:todoId/
// PUT - update todosa (completed, title)
// DELETE - usuniecie todosa o id
// *opcjonalnie GET


module.exports = {
  todoRouter,
}