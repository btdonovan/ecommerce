DROP TABLES IF EXISTS 
  users, 
  manufacturers, 
  customers, 
  items, 
  purchase_orders, 
  sales_orders;

CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL
);

CREATE TABLE manufacturers (
  id serial PRIMARY KEY,
  company_name varchar(100) NOT NULL,
  contact_name varchar(100) NOT NULL,
  contact_email varchar(100) NOT NULL,
  contact_phone varchar(100) NOT NULL
);

CREATE TABLE customers (
  id serial PRIMARY KEY,
  company_name varchar(100) NOT NULL,
  contact_name varchar(100) NOT NULL,
  contact_email varchar(100) NOT NULL,
  contact_phone varchar(100) NOT NULL
);

CREATE TABLE items (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text NOT NULL
);

CREATE TABLE purchase_orders (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  manufacturer_id integer NOT NULL,
  item_id integer NOT NULL,
  qty integer NOT NULL,
  date_ordered date,
  date_received date,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE sales_orders (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  customer_id integer NOT NULL,
  item_id integer NOT NULL,
  qty integer NOT NULL,
  date_ordered date NOT NULL,
  date_received date,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
)