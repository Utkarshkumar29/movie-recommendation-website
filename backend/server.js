const express = require('express');
const app = express();
require('./db/databse')
const Register=require('./model/login')
const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/', async (req, res) => {
    try {
      const user = new Register({
        username:req.body.username,
        password:req.body.password
      });
      const save = await user.save();
      res.status(201).json(save);
      console.log('success');
    } catch (error) {
      res.status(404).json({error:error.message});
    }
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.listen(7000, () => {
    console.log('Connected to the server at 7000');
  });


/*const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Register = require('./model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/prac', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("Connected to the database successfully");
});

app.post('/', async (req, res) => {
  try {
    const user = new Register({
      name: req.body.name
    });
    const save = await user.save();
    res.status(201).json(save);
    console.log('success');
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(8000, () => {
  console.log('Connected to the server at 8000');
});

*/
