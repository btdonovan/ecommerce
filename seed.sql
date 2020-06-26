DELETE FROM users WHERE id >= 0;
DELETE FROM manufacturers WHERE id >= 0;
DELETE FROM customers WHERE id >= 0;
DELETE FROM items WHERE id >= 0;
DELETE FROM purchase_orders WHERE id >= 0;
DELETE FROM sales_orders WHERE id >= 0;

INSERT INTO users 
  (first_name, last_name, email) 
  VALUES 
  ('Bob', 'Smith', 'bob.smith@ourcompany.com');
INSERT INTO manufacturers 
  (company_name, contact_name, contact_email, contact_phone) 
  VALUES 
  ('Cheech & Chong Glass', 'Tommy Chong', 'tc@ccg.com', '555-1212');
INSERT INTO customers 
  (company_name, contact_name, contact_email, contact_phone) 
  VALUES 
  ('Stoners Inc.', 'Dave Stoner', 'ds@stoners.com', '420-9876');
INSERT INTO items (name, description) VALUES ('bong', 'A simple glass bong');
INSERT INTO sales_orders
  (user_id, customer_id, item_id, qty, date_ordered, date_received)
  VALUES
  ((SELECT id FROM users WHERE last_name = 'Smith'),
   (SELECT id FROM customers WHERE contact_name = 'Dave Stoner'),
   (SELECT id FROM items WHERE name = 'bong'),
   200,
   '2020-06-26',
   null
  );
INSERT INTO purchase_orders
  (sales_order, manufacturer_id, date_ordered, date_received)
  VALUES
  (
    (SELECT id FROM sales_orders WHERE qty = 200),
    (SELECT id FROM manufacturers WHERE company_name = 'Cheech & Chong Glass'),
    null,
    null
  )