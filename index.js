const express = require('express');
const password = 'gJlvwY7mzcO0DWGS';

const uri = "mongodb+srv://organicdb:gJlvwY7mzcO0DWGS@cluster0.ij0ac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
})



const MongoClient = require('mongodb').MongoClient;

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.listen(3000);




