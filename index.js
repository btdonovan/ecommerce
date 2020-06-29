const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`app running on port ${port}.`)
})

// Root
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// Users

  // Create User
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

  // Read User
app.get('/user/:id', (request, response) => {
  db.readRow(request, response, 'users')
})

  // Update User
app.patch('/user/:id', (request, response) => {
  db.updateUser(request, response)
})

  // Delete User
app.delete('/user/:id', (request, response) => {
  db.deleteRow(request, response, 'users')
})

  // List Users
app.get('/users', (request, response) => {
  db.listRows(request, response, 'users')
})

// Manufacturers

  // Create Manufacturer
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

  // Read Manufacturer

app.get('/manufacturer/:id', (request, response) => {
  db.readRow(request, response, 'manufacturers')
})

  // Update Manufacturer
app.patch('/manufacturer/:id', (request, response) => {
  db.updateCompany(request, response, 'manufacturers')
})

  // Delete Manufacturer
app.delete('/manufacturer/:id', (request, response) => {
  db.deleteRow(request, response, 'manufacturers')
})

  // List Manufacturers
app.get('/manufacturers', (request, response) => {
  db.listRows(request, response, 'manufacturers')
})

// Customers

  // Create Customer
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

  // Read Customer
app.get('/customer/:id', (request, response) => {
  db.readRow(request, response, 'customers')
})

  // Update Customer
app.patch('/customer/:id', (request, response) => {
  db.updateCompany(request, response, 'customers')
})

  // Delete Customer
app.delete('/customer/:id', (request, response) => {
  db.deleteRow(request, response, 'customers')
})

  // List Customers
app.get('/customers', (request, response) => {
  db.listRows(request, response, 'customers')
})

// Items

  // Create Item

  // Read Item
app.get('/item/:id', (request, response) => {
  db.readRow(request, response, 'items')
})
  // Update Item

  // Delete Item
app.delete('/item/:id', (request, response) => {
  db.deleteRow(request, response, 'items')
})
  // List Items
app.get('/items', (request, response) => {
  db.listRows(request, response, 'items')
})

// Purchase Orders

  // Create Purchase Order
app.post('/purchase_order', (request, response) => {
  let sales_order = request.body.sales_order
  let manufacturer_id = request.body.manufacturer_id
  if (sales_order && manufacturer_id) {
    db.createPurchaseOrder(request, response)
  } else {
    response.send('Purchase Order data was incomplete.')
  }
})
  // Read Purchase Order
app.get('/purchase_order/:id', (request, response) => {
  db.readRow(request, response, 'purchase_orders')
})
  // Update Purchase Order

  // Delete Purchase Order
app.delete('/purchase_order/:id', (request, response) => {
  db.deleteRow(request, response, 'purchase_orders')
})
  // List Purchase Orders
app.get('/purchase_orders', (request, response) => {
  db.listRows(request, response, 'purchase_orders')
})

// Sales Orders

  // Create Sales Order
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
  // Read Sales Order
app.get('/sales_order/:id', (request, response) => {
  db.readRow(request, response, 'sales_orders')
})
  // Update Sales Order

  // Delete Sales Order
app.delete('/sales_order/:id', (request, response) => {
  db.deleteRow(request, response, 'sales_orders')
})
  // List Sales Orders
app.get('/sales_orders', (request, response) => {
  db.listRows(request, response, 'sales_orders')
})