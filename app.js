const express = require('express');
const knex = require('./connection'); // Asegúrate de que esta ruta sea correcta

const app = express();
app.use(express.json());

const Users = knex('users');

app.post('/', async (req, res) => {
  const newName = req.body.name;

  try {
    const data = await Users.update({ name: newName })
      .where('id', req.body.id);
    
    if (data === 0) {
      res.status(404).send('User not found');
    } else {
      res.send({ estado: 'ok', data: data });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update user name');
  }
});

module.exports = app;
