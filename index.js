const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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

  // get method (data come from database)
  app.get('/products', (req, res) =>{
    collection.find({}).limit(3)
    .toArray((err, documents) => {
      res.send(documents);
    })
  })

  app.get('/product/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })

  // post method (data set to database)
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product);
    collection.insertOne(product)
    .then(result => {
      console.log('one product added');
      res.send('success')
    })
  })

  // update data with patch(database data update)
  app.patch('/update/:id', (req, res) => {
    collection.updateOne({_id: ObjectId(req.params.id)},{
      $set: {price: req.body.price, quantity: req.body.quantity}
    })
    .then(res => {
      console.log('success');
    })
  })


// delete method (data delete from database)
app.delete('/delete/:id', (req, res) => {
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then((result) => {
    console.log(result);
  })
})
});




app.listen(3000);




