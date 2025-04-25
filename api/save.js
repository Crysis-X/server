const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.txt');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Только POST!');
  }

  const text = req.body;

  if (!text) {
    return res.status(400).send('Текст не предоставлен!');
  }

  try {
    await fs.promises.appendFile(DATA_FILE, text + '\n');
    res.send('Текст сохранён!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка записи!');
  }
};
