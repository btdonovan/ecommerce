DELETE FROM purchase_orders WHERE id >= 0;
DELETE FROM sales_orders WHERE id >= 0;
DELETE FROM users WHERE id >= 0;
DELETE FROM manufacturers WHERE id >= 0;
DELETE FROM customers WHERE id >= 0;
DELETE FROM items WHERE id >= 0;



INSERT INTO users 
  (first_name, last_name, email, address) 
  VALUES 
  ('Bob', 'Smith', 'bob.smith@ourcompany.com', '123 Corporate Drive\nSuite 300\nCity of Industry, CA 90601');
INSERT INTO manufacturers 
  (company_name, contact_name, contact_email, contact_phone, address) 
  VALUES 
  ('Acme Inc.', 'Road Runner', 'rr@acme.com', '555-1212', '321 Acme Lane\nTucson, AZ 85701');
INSERT INTO customers 
  (company_name, contact_name, contact_email, contact_phone, address) 
  VALUES 
  ('Nuisance Bird Exterminators', 'Wile E. Coyote', 'i_hate_road_runners@nbe.com', '555-9876', '567 Predator Lane\nPhoenix, AZ 85001');
INSERT INTO items (name, description) VALUES ('rocket', 'Guranteed not to launch you into a cliff.');
INSERT INTO sales_orders
  (user_id, customer_id, item_id, qty, date_ordered, date_received)
  VALUES
  ((SELECT id FROM users WHERE last_name = 'Smith'),
   (SELECT id FROM customers WHERE contact_name = 'Wile E. Coyote'),
   (SELECT id FROM items WHERE name = 'rocket'),
   2,
   '2020-06-26',
   null
  );
INSERT INTO purchase_orders
  (sales_order, manufacturer_id, date_ordered, date_received)
  VALUES
  (
    (SELECT id FROM sales_orders WHERE qty = 2),
    (SELECT id FROM manufacturers WHERE company_name = 'Acme Inc.'),
    null,
    null
  )