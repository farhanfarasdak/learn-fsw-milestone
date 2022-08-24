const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://farhan-mongodb:farhan123@cluster0.nbn4pfl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require('express')
const app = express()
const port = 3000

// READ
app.get('/engineers', async (req, res) => {

  let resp
  await client.connect();
  console.log('Connected successfully to server');
  const db =  client.db("myFirstDatabase").collection("engineers");
  
  resp = await db.find().toArray()
  client.close()

  res.send(resp)
})

app.get('/engineers/:address', async (req, res) => {
  let address = req.params.address

  let resp
  await client.connect();
  console.log('Connected successfully to server');
  const db =  client.db("myFirstDatabase").collection("engineers");
  
  resp = await db.find({address: address}).toArray()
  client.close()

  res.send(resp)
})

// Create(POST) Read(GET) Update(PUT/PATCH) Delete(DELETE)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})