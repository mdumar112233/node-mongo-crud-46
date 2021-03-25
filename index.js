const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://organicdb:gJlvwY7mzcO0DWGS@cluster0.ij0ac.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
  const collection = client.db("organicdb").collection("products");

  app.get('/products', (req, res) =>{
    collection.find({}).limit(2)
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product);
    collection.insertOne(product)
    .then(result => {
      console.log('one product added');
      res.send('success')
    })
  })
});


app.listen(3000);




