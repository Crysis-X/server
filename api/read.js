const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.txt');
const SECRET_WORD = "secret123"; // Секретное слово

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Только GET!');
  }

  const key = req.query.key;

  if (key !== SECRET_WORD) {
    return res.status(403).send('Неверный ключ!');
  }

  try {
    const data = await fs.promises.readFile(DATA_FILE, 'utf8');
    res.send(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.send('Файл пуст!');
    } else {
      console.error(err);
      res.status(500).send('Ошибка чтения!');
    }
  }
};
