const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

const {todoRouter} = require('./routes/todo.routes');

// Init
const app = express();
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Settings
const PUBLIC_PATH = path.join(__dirname, 'public');
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 500,
});

// Middlewares
app.use(express.static(PUBLIC_PATH));
app.use(bodyParser.json());
app.use('/api', todoRouter);
app.use('/api', apiLimiter);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
});

app.listen(PORT, 'localhost', () => {
  console.log(`App running on port ${PORT}`);
});