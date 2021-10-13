const {readFile, writeFile} = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data');

async function getTodosFromDatabase() {
  try {
    const content = await readFile(path.join(DATA_PATH, 'database.json'));
    return JSON.parse(content);
  } catch(error) {
    await writeFile(path.join(DATA_PATH, 'database.json'), JSON.stringify([]));
    return [];
  }
}

module.exports = {
  getTodosFromDatabase,
}