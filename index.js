const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`app running on port ${port}.`)
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', (request, response) => {
  db.listRows(request, response, 'users')
})

app.get('/user/:id', (request, response) => {
  db.readRow(request, response, 'users')
})

app.post('/user', (request, response) => {
  let first_name = request.body.first_name
  let last_name = request.body.last_name
  let email = request.body.email
  if (first_name && last_name && email) {
    db.createUser(request, response)
  } else {
    response.send('User data was incomplete.')
  }
})

app.patch('/user/:id', (request, response) => {
  db.updateUser(request, response)
})

app.delete('/user/:id', (request, response) => {
  db.deleteRow(request, response, 'users')
})

app.get('/manufacturers', (request, response) => {
  db.listRows(request, response, 'manufacturers')
})

app.get('/manufacturer/:id', (request, response) => {
  db.readRow(request, response, 'manufacturers')
})

app.delete('/manufacturer/:id', (request, response) => {
  db.deleteRow(request, response, 'manufacturers')
})

app.post('/manufacturer', (request, response) => {
  let company_name = request.body.company_name
  let contact_name = request.body.contact_name
  let contact_email = request.body.contact_email
  let contact_phone = request.body.contact_phone
  if (company_name && contact_name && contact_email && contact_phone) {
    db.createCompany(request, response, 'manufacturers')
  } else {
    response.send('Manufacturer data was incomplete.')
  }
})

app.patch('/manufacturer/:id', (request, response) => {
  db.updateCompany(request, response, 'manufacturers')
})

app.get('/customers', (request, response) => {
  db.listRows(request, response, 'customers')
})

app.get('/customer/:id', (request, response) => {
  db.readRow(request, response, 'customers')
})

app.delete('/customer/:id', (request, response) => {
  db.deleteRow(request, response, 'customers')
})

app.post('/customer', (request, response) => {
  let company_name = request.body.company_name
  let contact_name = request.body.contact_name
  let contact_email = request.body.contact_email
  let contact_phone = request.body.contact_phone
  if (company_name && contact_name && contact_email && contact_phone) {
    db.createCompany(request, response, 'customers')
  } else {
    response.send('Customer data was incomplete.')
  }
})

app.patch('/customer/:id', (request, response) => {
  db.updateCompany(request, response, 'customers')
})

app.get('/items', (request, response) => {
  db.listRows(request, response, 'items')
})

app.get('/item/:id', (request, response) => {
  db.readRow(request, response, 'items')
})

app.delete('/item/:id', (request, response) => {
  db.deleteRow(request, response, 'items')
})

app.get('/purchase_orders', (request, response) => {
  db.listRows(request, response, 'purchase_orders')
})

app.get('/purchase_order/:id', (request, response) => {
  db.readRow(request, response, 'purchase_orders')
})

app.delete('/purchase_order/:id', (request, response) => {
  db.deleteRow(request, response, 'purchase_orders')
})

app.post('/purchase_order', (request, response) => {
  let sales_order = request.body.sales_order
  let manufacturer_id = request.body.manufacturer_id
  if (sales_order && manufacturer_id) {
    db.createPurchaseOrder(request, response)
  } else {
    response.send('Purchase Order data was incomplete.')
  }
})

app.get('/sales_orders', (request, response) => {
  db.listRows(request, response, 'sales_orders')
})

app.get('/sales_order/:id', (request, response) => {
  db.readRow(request, response, 'sales_orders')
})

app.delete('/sales_order/:id', (request, response) => {
  db.deleteRow(request, response, 'sales_orders')
})

app.post('/sales_order', (request, response) => {
  let user_id = request.body.user_id
  let customer_id = request.body.customer_id
  let item_id = request.body.item_id
  let qty = request.body.qty
  let date_ordered = request.body.date_ordered
  if (user_id && customer_id && item_id && qty && date_ordered) {
    db.createSalesOrder(request, response)
  } else {
    response.send('Sales Order data was incomplete.')
  }
})