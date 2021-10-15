const express = require('express');
const {v4: uuidv4} = require('uuid');

const {getTodosFromDatabase, saveTodosIntoDatabase} = require('../utils');

const todoRouter = express.Router();

todoRouter
  .get('/todos', async (req, res) => {
    try {
      const todos = await getTodosFromDatabase();
      res.json(todos);
    } catch (error) {
      res.json({error: error.message});
      console.log(error.message);
    }
  })
  .patch('/todo/:todoId', async (req, res) => {
    try {
      const {todoId} = req.params;
      const todos = (await getTodosFromDatabase()).map((todo) => todo.id === todoId ? {...todo, ...req.body} : todo);
      await saveTodosIntoDatabase(todos);
      res.json(todos);
    } catch (error) {
      res.json({error: error.message});
      console.log(error.message);
    }
  })
  .post('/todo/create', async (req, res) => {
    try {
      const {title} = req.body;
      const todos = await getTodosFromDatabase();
      todos.push({
        id: uuidv4(),
        title,
        completed: false,
      });
      await saveTodosIntoDatabase(todos);
      res.json(todos);
    } catch (error) {
      res.json({error: error.message});
      console.log(error.message);
    }
  })
  .delete('/todo/:todoId', async (req, res) => {
    try {
      const {todoId} = req.params;
      const todos = (await getTodosFromDatabase()).filter((todo) => todo.id !== todoId);
      await saveTodosIntoDatabase(todos);
      res.json(todos);
    } catch (error) {
      res.json({error: error.message});
      console.log(error.message);
    }
  });

module.exports = {
  todoRouter,
};