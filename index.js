const express = require('express')
const bodyParser = require('body-parser')
const { Tweet } = require('./models')

const app = express()
const jsonParser = bodyParser.json()


// CRUD = CREATE, READ, UPDATE, DELETE 

// READ
app.get('/', async (req, res)=>{
  // SELECT * FROM <db_name>;
  const data = await Tweet.findAll()
  res.send(data)
})

app.get('/search', async (req, res) => {
  // SELECT * FROM <db_name> WHERE name=<>
  const data = await Tweet.findAll({
    where: {
      owner: req.query.name
    }
  })
  res.send(data)
})

app.get('/:id', async (req, res)=> {
  // SELECT * FROM <db_name> WHERE id=<id> 
  const data = await Tweet.findOne({
    where: {
      id: req.params.id
    }
  })
  if( data == null){
    res.status(404).send("Data Not Found")
  }else{
    res.send(data)
  }
})

// CREATE
app.post('/', jsonParser, async (req, res)=>{
  // INSERT INTO <db_name> (col1, col2...) VALUES (val1, val2,...);
  const data = await Tweet.create({
    content: req.body.content,
    owner: req.body.owner
  })
  res.send(data)
})

// UPDATE
app.put('/:id', jsonParser, async (req, res)=> {
  try {
    const data = await Tweet.findOne({
      where: {
        id: req.params.id
      }
    })

    // null.content
    data.content = req.body.content
    data.save()
  
    res.send(data)
    
  } catch (error) {
    res.status(404).send("Unable to process the request")
  }
})

// DELETE
app.delete('/:id', async (req,res)=>{
  try {
    const data = await Tweet.findOne({
      where: {
        id: req.params.id
      }
    })
    data.destroy()
    res.send('Data has been deleted')
  } catch (error) {
    res.status(404).send("Unable to process the request")
  }
})

app.listen(4000, () => {
  console.log("Running at localhost:4000")
})