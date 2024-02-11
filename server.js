require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user'); 
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json()); 
app.use('/users', userRoutes);

const DB_HOST = "cluster0.z7sm5qd.mongodb.net";
const DB_USER = "aaloreabi2000";
const DB_PASSWORD = process.env.PASSWORD;
const DB_NAME = "lab4comp3133";
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING).then(() => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection:', err)
  });

const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error);
});

database.once('open', () => {
    console.log('Database connection successful');
});
// POST API endpoint
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
