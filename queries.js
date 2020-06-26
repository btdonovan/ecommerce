const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'ecommerce',
  password: 'password',
  port: 5432,
})

const listRows = (request, response, tableName) => {
  pool.query (
    `SELECT * FROM ${tableName} ORDER BY id ASC`,
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

const createUser = (request, response) => {
  let first_name = request.body.first_name
  let last_name = request.body.last_name
  let email = request.body.email
  pool.query(
    'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)', 
    [first_name, last_name, email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User ${first_name} ${last_name} added.`)
    }
  )
}

const readRow = (request, response, tableName) => {
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`, 
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const updateUser = (request, response) => {
  var user
  pool.query(
    'SELECT * FROM users WHERE id = $1',
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        user = results.rows[0]
        if (user) {
          let newUser = {...user, ...request.body}
          let firstName = newUser.first_name
          let lastName = newUser.last_name
          let email = newUser.email
          let id = newUser.id
          pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
            [firstName, lastName, email, id],
            (error, results) => {
              if (error) {
                throw error
              }
              response.send(`updated user ${id}`)
            }
          )
        }
      }
    }
  )
}

const deleteRow = (request, response, tableName) => {
  pool.query(
    `DELETE FROM ${tableName} WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`successfully deleted ${request.params.id}`)
    }
  )
}

const createCompany = (request, response, tableName) => {
  let company_name = request.body.company_name
  let contact_name = request.body.contact_name
  let contact_email = request.body.contact_email
  let contact_phone = request.body.contact_phone
  pool.query(
    `INSERT INTO ${tableName} (company_name, contact_name, contact_email, contact_phone) VALUES ($1, $2, $3, $4)`, 
    [company_name, contact_name, contact_email, contact_phone],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`${tableName.slice(0, tableName.length - 1)} ${company_name} added.`)
    }
  )
}

const updateCompany = (request, response, tableName) => {
  let company
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = $1`,
    [request.params.id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length === 1) {
        company = results.rows[0]
        let newCompany = {...company, ...request.body}
        let company_name = newCompany.company_name
        let contact_name = newCompany.contact_name
        let contact_email = newCompany.contact_email
        let contact_phone = newCompany.contact_phone
        let id = newCompany.id
        pool.query(
          `UPDATE ${tableName} SET company_name = $1, contact_name = $2, contact_email = $3, contact_phone = $4 WHERE id = $5`,
          [company_name, contact_name, contact_email, contact_phone, id],
          (error, results) => {
            if (error) {
              throw error
            }
            response.send(`updated ${tableName.slice(0, tableName.length - 1)} ${id}`)
          }
        )
      }
    }
  )
}

const createPurchaseOrder = (request, response) => {
  let sales_order = request.body.sales_order
  let manufacturer_id = request.body.manufacturer_id
  let date_ordered = request.body.date_ordered
  let date_received = request.body.date_received
  pool.query(
    `INSERT INTO purchase_orders (sales_order, manufacturer_id, date_ordered, date_received) VALUES ($1, $2, $3, $4)`, 
    [sales_order, manufacturer_id, date_ordered, date_received],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Purchase Order added for manufacturer id ${manufacturer_id}.`)
    }
  )
}

const createSalesOrder = (request, response) => {
  let user_id = request.body.user_id
  let customer_id = request.body.customer_id
  let item_id = request.body.item_id
  let qty = request.body.qty
  let date_ordered = request.body.date_ordered
  let date_received = request.body.date_received
  if (!date_received) {
    date_received = null
  }
  pool.query(
    `INSERT INTO sales_orders (user_id, customer_id, item_id, qty, date_ordered, date_received) VALUES ($1, $2, $3, $4, $5, $6)`, 
    [user_id, customer_id, item_id, qty, date_ordered, date_received],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Sales Order added for customer id ${customer_id}.`)
    }
  )
}

module.exports = {
  listRows,
  createUser,
  readRow,
  updateUser,
  deleteRow,
  createCompany,
  updateCompany,
  createPurchaseOrder,
  createSalesOrder,
}