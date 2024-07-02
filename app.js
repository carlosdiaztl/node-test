
const kenx = require('./connection.js')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());
const Users = kenx('users')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // kenx.select('*').from('users').then(data => {
  //   console.log(data)
  // })

  // const user = Users.where('name', 'carlos').first().then(data => {
  //   console.log(data);
  // })
  
  console.log(`Example app listening on port ${kenx('knex').client.addListener}`)
})

app.post('/', (req, res) => {
  const newName = req.body.name;

  Users.update({ name: newName })
    .where('id', req.body.id)
    .then(data => {
      if (data === 0) {
        res.status(404).send('User not found');
        
      }else{

        res.send({estado:'ok',data:data});
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to update user name');
    });
});