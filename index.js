const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios').default;
const { Menu } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.set('view engine', 'ejs')
app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))

// VIEWS
app.get('/dashboard', async (req,res)=> {
  const data = await axios.get('http://localhost:7575/menu')
  console.log(data.data)
  

  res.render('dashboard', { menus: data.data } )
})



// CREATE
app.post('/menu', jsonParser, async (req, res) => {
  try {
    const menu = await Menu.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    })
  
    res.status(201).send(menu)
  } catch (error) {
    res.status(422).send('UNABLE TO INSERT DATA')
  }
})

// READ
app.get('/menu', async(req,res) => {
  const menus = await Menu.findAll()
  res.send(menus)
})

// UPDATE
app.put('/menu/:id', jsonParser, async(req, res) => {
  // const menu = await Menu.findOne({
  //   where:{
  //     id: req.params.id
  //   }
  // })

  try {
    const menu = await Menu.findByPk(req.params.id)
    menu.name = req.body.name
    menu.description = req.body.description
    menu.price = req.body.price
    await menu.save()

    res.status(202).send(menu)
  } catch (error) {
    res.status(422).send('UNABLE TO UPDATE DATA')
  }

})

// DELETE
app.delete('/menu/:id', async(req,res) => {
  try {
    const menu = await Menu.findByPk(req.params.id)
    menu.destroy()
    res.status(202).send('DELETED')
  } catch (error) {
    res.status(422).send('UNABLE TO DELETE DATA')
  }
})




app.listen('7575', () => {
  console.log('APP IS RUNNING')
})