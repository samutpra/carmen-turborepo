

-- (2) insert users
INSERT INTO "CARMEN_SYSTEM"."tb_user" (id, username, email, is_active, is_consent, consent) VALUES
('6ba7b8ac-9dad-11d1-80b4-00c04fd430c8', 'test@carmensoftware.com', 'test@carmensoftware.com', true, true, CURRENT_TIMESTAMP),
('6ba7b8ad-9dad-11d1-80b4-00c04fd430c8', 'user@carmensoftware.com', 'user@carmensoftware.com', true, true, CURRENT_TIMESTAMP),
('6ba7b8ae-9dad-11d1-80b4-00c04fd430c8', 'admin@carmensoftware.com', 'admin@carmensoftware.com', true, true, CURRENT_TIMESTAMP);

-- (3) insert passwords
INSERT INTO "CARMEN_SYSTEM"."tb_password" (id, user_id, hash, is_active) VALUES
('6ba7b8ae-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), 'test@carmensoftware.com', true),
('6ba7b8af-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), 'user@carmensoftware.com', true),
('6ba7b8b0-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), 'admin@carmensoftware.com', true);

-- (4) insert user_profile
INSERT INTO "CARMEN_SYSTEM"."tb_user_profile" (id, user_id, firstname, middlename, lastname, bio) VALUES
('6ba7b8ac-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), 'test', 'test', 'test', '{}'),
('6ba7b8ad-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), 'user', 'user', 'user', '{}'),
('6ba7b8ae-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), 'admin', 'admin', 'admin', '{}');

-- (5) Insert Clusters
INSERT INTO "CARMEN_SYSTEM"."tb_cluster" (id, code, name, is_active) VALUES
('6ba7b911-9dad-11d1-80b4-00c04fd430c8', 'DUMMY', 'DUMMY', true),
('6ba7b912-9dad-11d1-80b4-00c04fd430c8', 'CLUS-002', 'South Wing', true),
('6ba7b913-9dad-11d1-80b4-00c04fd430c8', 'CLUS-003', 'East Wing', true),
('6ba7b914-9dad-11d1-80b4-00c04fd430c8', 'CLUS-004', 'West Wing', true);

-- (6) Insert Cluster Users
INSERT INTO "CARMEN_SYSTEM"."tb_cluster_user" (id, user_id, cluster_id, is_active) VALUES
('6ba7b915-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), '6ba7b911-9dad-11d1-80b4-00c04fd430c8', true),
('6ba7b916-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), '6ba7b911-9dad-11d1-80b4-00c04fd430c8', true),
('6ba7b917-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), '6ba7b911-9dad-11d1-80b4-00c04fd430c8', true);

-- (7) Insert Business Units
INSERT INTO "CARMEN_SYSTEM"."tb_business_unit" (id, code, name, description, is_active, is_hq, cluster_id) VALUES
('6ba7b921-9dad-11d1-80b4-00c04fd430c8', 'DUMMY', 'DUMMY', 'Main hotel operations unit', true, true, '6ba7b911-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b922-9dad-11d1-80b4-00c04fd430c8', 'BU-002', 'Food & Beverage', 'Restaurant and catering services', true, false, '6ba7b911-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b923-9dad-11d1-80b4-00c04fd430c8', 'BU-003', 'Housekeeping', 'Room maintenance and cleaning services', true, false, '6ba7b911-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b924-9dad-11d1-80b4-00c04fd430c8', 'BU-004', 'Spa & Wellness', 'Spa and wellness center operations', true, false, '6ba7b911-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b925-9dad-11d1-80b4-00c04fd430c8', 'BU-005', 'Events & Conferences', 'Event planning and conference facilities', true, false, '6ba7b911-9dad-11d1-80b4-00c04fd430c8');

-- (8) Insert Modules
INSERT INTO "CARMEN_SYSTEM"."tb_module" (id, name, description) VALUES
('6ba7b931-9dad-11d1-80b4-00c04fd430c8', 'PR', 'Purchase Request'),
('6ba7b932-9dad-11d1-80b4-00c04fd430c8', 'PO', 'Purchase Order'),
('6ba7b933-9dad-11d1-80b4-00c04fd430c8', 'GN', 'Goods Receipt'),
('6ba7b934-9dad-11d1-80b4-00c04fd430c8', 'SR', 'Stock Request'),
('6ba7b935-9dad-11d1-80b4-00c04fd430c8', 'IN', 'Inventory'),
('6ba7b936-9dad-11d1-80b4-00c04fd430c8', 'INV', 'Inventory Adjustment');

-- (9) Insert Currencies
INSERT INTO "TENANT_DUMMY"."tb_currency" (id, code, name, symbol, is_active) VALUES
('6ba7b8aa-9dad-11d1-80b4-00c04fd430c8', 'THB', 'Thai Baht', '฿', true),
('6ba7b8ab-9dad-11d1-80b4-00c04fd430c8', 'USD', 'US Dollar', '$', true);

-- (10) insert exchange rate
INSERT INTO "TENANT_DUMMY"."tb_exchange_rate" (id, currency_id, exchange_rate, at_date) VALUES
('6ba7b8ac-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_currency" WHERE code = 'THB'), 1, CURRENT_TIMESTAMP),
('6ba7b8ad-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_currency" WHERE code = 'USD'), 30, CURRENT_TIMESTAMP);

-- (11) Insert Delivery Points
INSERT INTO "TENANT_DUMMY"."tb_delivery_point" (id, name, is_active) VALUES
('6ba7b8b6-9dad-11d1-80b4-00c04fd430c8', 'Main Kitchen', true),
('6ba7b8b7-9dad-11d1-80b4-00c04fd430c8', 'Housekeeping Store', true),
('6ba7b8b8-9dad-11d1-80b4-00c04fd430c8', 'Engineering Workshop', true),
('6ba7b8b9-9dad-11d1-80b4-00c04fd430c8', 'Front Office', true);

-- (12) Insert Locations
INSERT INTO "TENANT_DUMMY"."tb_location" (id, name, location_type, description, is_active, delivery_point_id) VALUES
('6ba7b8ba-9dad-11d1-80b4-00c04fd430c8', 'Main Warehouse', 'inventory', 'Main Hotel Storage', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Main Kitchen')),
('6ba7b8bb-9dad-11d1-80b4-00c04fd430c8', 'HK Store Room', 'inventory', 'Housekeeping Storage', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Housekeeping Store')),
('6ba7b8bc-9dad-11d1-80b4-00c04fd430c8', 'F&B Storage', 'inventory', 'Food and Beverage Storage Area', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Front Office')),
('6ba7b8bd-9dad-11d1-80b4-00c04fd430c8', 'Engineering Workshop', 'inventory', 'Engineering Tools and Parts Storage', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Engineering Workshop')),
('6ba7b8be-9dad-11d1-80b4-00c04fd430c8', 'Front Office Storage', 'inventory', 'Front Office Supplies Storage', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Front Office')),
('6ba7b8bf-9dad-11d1-80b4-00c04fd430c8', 'Chemical Store', 'inventory', 'Chemical and Cleaning Supplies Storage', true, (SELECT id FROM "TENANT_DUMMY"."tb_delivery_point" WHERE name = 'Front Office'));

-- (13) insert user location
INSERT INTO "TENANT_DUMMY"."tb_user_location" (id, user_id, location_id) VALUES
('6ba7b8c1-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), '6ba7b8ba-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c2-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), '6ba7b8bb-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c3-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), '6ba7b8bc-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c4-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), '6ba7b8ba-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c5-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), '6ba7b8bb-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c6-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), '6ba7b8bd-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c7-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), '6ba7b8ba-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c8-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), '6ba7b8bc-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8c9-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), '6ba7b8be-9dad-11d1-80b4-00c04fd430c8'),
('6ba7b8ca-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), '6ba7b8bf-9dad-11d1-80b4-00c04fd430c8');

-- (14) Insert Units
INSERT INTO "TENANT_DUMMY"."tb_unit" (id, name, description, is_active) VALUES
('6ba7b8ac-9dad-11d1-80b4-00c04fd430c8', 'EA',  'Each', true),
('6ba7b8ad-9dad-11d1-80b4-00c04fd430c8', 'BOX', 'Box', true), 
('6ba7b8ae-9dad-11d1-80b4-00c04fd430c8', 'KG',  'Kilogram', true),
('6ba7b8af-9dad-11d1-80b4-00c04fd430c8', 'SET', 'Set', true),
('6ba7b8b0-9dad-11d1-80b4-00c04fd430c8', 'ROL', 'Roll', true),
('6ba7b8b1-9dad-11d1-80b4-00c04fd430c8', 'BTL', 'Bottle', true),
('6ba7b8b2-9dad-11d1-80b4-00c04fd430c8', 'L', 'Liter', true),
('6ba7b8b3-9dad-11d1-80b4-00c04fd430c8', 'PCS', 'Piece', true),
('6ba7b8b4-9dad-11d1-80b4-00c04fd430c8', 'PAR', 'Pair', true),
('6ba7b8b5-9dad-11d1-80b4-00c04fd430c8', 'PKT', 'Packet', true);

-- (15) Insert Departments
INSERT INTO "TENANT_DUMMY"."tb_department" (id, name, description, is_active) VALUES
('6ba7b8b2-9dad-11d1-80b4-00c04fd430c8', 'Housekeeping', 'Housekeeping Department', true),
('6ba7b8b3-9dad-11d1-80b4-00c04fd430c8', 'F&B', 'Food and Beverage Department', true),
('6ba7b8b4-9dad-11d1-80b4-00c04fd430c8', 'Engineering', 'Engineering and Maintenance', true),
('6ba7b8b5-9dad-11d1-80b4-00c04fd430c8', 'Front Office', 'Front Office Department', true),
('6ba7b8b6-9dad-11d1-80b4-00c04fd430c8', 'Sales', 'Sales and Marketing Department', true),
('6ba7b8b7-9dad-11d1-80b4-00c04fd430c8', 'HR', 'Human Resources Department', true),
('6ba7b8b8-9dad-11d1-80b4-00c04fd430c8', 'Finance', 'Finance and Accounting Department', true),
('6ba7b8b9-9dad-11d1-80b4-00c04fd430c8', 'IT', 'Information Technology Department', true),
('6ba7b8ba-9dad-11d1-80b4-00c04fd430c8', 'Security', 'Security Department', true),
('6ba7b8bb-9dad-11d1-80b4-00c04fd430c8', 'Spa', 'Spa and Wellness Department', true);

-- (16) Insert Product Categories
INSERT INTO "TENANT_DUMMY"."tb_product_category" (id, code, name, description, is_active) VALUES
('6ba7b8c1-9dad-11d1-80b4-00c04fd430c8', '1', 'FOOD', 'Food', true),
('6ba7b8c2-9dad-11d1-80b4-00c04fd430c8', '2', 'BEVERAGE', 'Beverage', true),
('6ba7b8c3-9dad-11d1-80b4-00c04fd430c8', '3', 'MAINTENANCE', 'Maintenance', true),
('6ba7b8c4-9dad-11d1-80b4-00c04fd430c8', '4', 'OFFICE', 'Office Supplies', true),
('6ba7b8c5-9dad-11d1-80b4-00c04fd430c8', '5', 'CLEANING', 'Cleaning Supplies', true),
('6ba7b8c6-9dad-11d1-80b4-00c04fd430c8', '6', 'GUEST', 'Guest Amenities', true),
('6ba7b8c7-9dad-11d1-80b4-00c04fd430c8', '7', 'ROOM', 'Room Supplies', true),
('6ba7b8c8-9dad-11d1-80b4-00c04fd430c8', '8', 'OTHER', 'Other', true);

-- (17) Insert Product Sub Categories
INSERT INTO "TENANT_DUMMY"."tb_product_sub_category" (id, code, name, description, product_category_id, is_active) VALUES
('6ba7b8c9-9dad-11d1-80b4-00c04fd430c8', '101', 'Breakfast', 'Breakfast', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '1'), true),
('6ba7b8ca-9dad-11d1-80b4-00c04fd430c8', '102', 'Lunch', 'Lunch', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '1'), true),
('6ba7b8cb-9dad-11d1-80b4-00c04fd430c8', '103', 'Dinner', 'Dinner', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '1'), true),
('6ba7b8cc-9dad-11d1-80b4-00c04fd430c8', '104', 'Snack', 'Snack', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '1'), true),
('6ba7b8cd-9dad-11d1-80b4-00c04fd430c8', '105', 'Dessert', 'Dessert', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '1'), true),
('6ba7b8ce-9dad-11d1-80b4-00c04fd430c8', '201', 'Drink', 'Drink', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '2'), true),
('6ba7b8cf-9dad-11d1-80b4-00c04fd430c8', '202', 'Minibar', 'Minibar', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '2'), true),
('6ba7b8d0-9dad-11d1-80b4-00c04fd430c8', '601', 'AMENITY', 'Amenity', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '6'), true),
('6ba7b8d1-9dad-11d1-80b4-00c04fd430c8', '701', 'LINEN', 'Linen', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '7'), true),
('6ba7b8d2-9dad-11d1-80b4-00c04fd430c8', '501', 'CLEANING', 'Cleaning', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '5'), true),
('6ba7b8d3-9dad-11d1-80b4-00c04fd430c8', '801', 'OTHER', 'Other', (SELECT id FROM "TENANT_DUMMY"."tb_product_category" WHERE code = '8'), true);

-- (18) Insert Product Item group
INSERT INTO "TENANT_DUMMY"."tb_product_item_group" (id, code, name, description, is_active, product_subcategory_id) VALUES
('6ba7b8d4-9dad-11d1-80b4-00c04fd430c8', '601001', 'Bathroom Amenities', 'Bathroom supplies and amenities', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '601')),
('6ba7b8d5-9dad-11d1-80b4-00c04fd430c8', '701001', 'Bedding', 'Bed linens and accessories', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '701')), 
('6ba7b8d6-9dad-11d1-80b4-00c04fd430c8', '201001', 'Beverages', 'Drinks and beverages', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '201')),
('6ba7b8d7-9dad-11d1-80b4-00c04fd430c8', '104001', 'Snacks', 'Snacks and light refreshments', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '104')),
('6ba7b8d8-9dad-11d1-80b4-00c04fd430c8', '501001', 'Floor Care', 'Floor cleaning supplies', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '501')),
('6ba7b8d9-9dad-11d1-80b4-00c04fd430c8', '701002', 'Bathroom Linens', 'Bathroom towels and linens', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '701')),
('6ba7b8da-9dad-11d1-80b4-00c04fd430c8', '801001', 'Office Supplies', 'Office stationery and supplies', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '801')),
('6ba7b8db-9dad-11d1-80b4-00c04fd430c8', '501002', 'Kitchen Supplies', 'Kitchen cleaning and supplies', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '501')),
('6ba7b8dc-9dad-11d1-80b4-00c04fd430c8', '501003', 'Laundry Items', 'Laundry detergents and supplies', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '501')),
('6ba7b8dd-9dad-11d1-80b4-00c04fd430c8', '801002', 'Miscellaneous', 'Other miscellaneous items', true, (SELECT id FROM "TENANT_DUMMY"."tb_product_sub_category" WHERE code = '801'));


-- (19) Insert Products
INSERT INTO "TENANT_DUMMY"."tb_product" (id, code, name, local_name, description, primary_unit_id, product_status_type) VALUES
('6ba7b8e1-9dad-11d1-80b4-00c04fd430c8', 'SOAP-001', 'Bath Soap', 'สบู่อาบน้ำ', 'Luxury bath soap for guests', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8e2-9dad-11d1-80b4-00c04fd430c8', 'SHAM-001', 'Shampoo', 'แชมพู', 'Premium hair shampoo', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8e3-9dad-11d1-80b4-00c04fd430c8', 'TOWEL-001', 'Bath Towel', 'ผ้าเช็ดตัว', 'Soft cotton bath towel', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8e4-9dad-11d1-80b4-00c04fd430c8', 'TISSUE-001', 'Facial Tissue', 'กระดาษทิชชู่', 'Soft facial tissues', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BOX'), 'active'),
('6ba7b8e5-9dad-11d1-80b4-00c04fd430c8', 'WATER-001', 'Mineral Water', 'น้ำดื่ม', 'Bottled mineral water', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BTL'), 'active'),
('6ba7b8e6-9dad-11d1-80b4-00c04fd430c8', 'SNACK-001', 'Mixed Nuts', 'ถั่วรวม', 'Assorted premium nuts', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PKT'), 'active'),
('6ba7b8e7-9dad-11d1-80b4-00c04fd430c8', 'CLEAN-001', 'Floor Cleaner', 'น้ำยาถูพื้น', 'All-purpose floor cleaner', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BTL'), 'active'),
('6ba7b8e8-9dad-11d1-80b4-00c04fd430c8', 'SHEET-001', 'Bed Sheet', 'ผ้าปูที่นอน', 'Cotton bed sheet', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8e9-9dad-11d1-80b4-00c04fd430c8', 'PILLOW-001', 'Pillow', 'หมอน', 'Soft hotel pillow', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8ea-9dad-11d1-80b4-00c04fd430c8', 'PAPER-001', 'Toilet Paper', 'กระดาษชำระ', 'Toilet tissue roll', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'ROL'), 'active'),
('6ba7b8eb-9dad-11d1-80b4-00c04fd430c8', 'COND-001', 'Conditioner', 'ครีมนวดผม', 'Hair conditioner', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BTL'), 'active'),
('6ba7b8ec-9dad-11d1-80b4-00c04fd430c8', 'SLIPPER-001', 'Slippers', 'รองเท้าแตะ', 'Hotel slippers', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PAR'), 'active'),
('6ba7b8ed-9dad-11d1-80b4-00c04fd430c8', 'COFFEE-001', 'Coffee Sachet', 'กาแฟซอง', 'Instant coffee sachets', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PKT'), 'active'),
('6ba7b8ee-9dad-11d1-80b4-00c04fd430c8', 'TEA-001', 'Tea Bags', 'ชาถุง', 'Assorted tea bags', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BOX'), 'active'),
('6ba7b8ef-9dad-11d1-80b4-00c04fd430c8', 'HANGER-001', 'Clothes Hanger', 'ไม้แขวนเสื้อ', 'Wooden clothes hanger', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8f0-9dad-11d1-80b4-00c04fd430c8', 'LOTION-001', 'Body Lotion', 'โลชั่นทาผิว', 'Moisturizing body lotion', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'BTL'), 'active'),
('6ba7b8f1-9dad-11d1-80b4-00c04fd430c8', 'DENTAL-001', 'Dental Kit', 'ชุดแปรงสีฟัน', 'Toothbrush and toothpaste set', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'SET'), 'active'),
('6ba7b8f2-9dad-11d1-80b4-00c04fd430c8', 'SHOWER-001', 'Shower Cap', 'หมวกอาบน้ำ', 'Disposable shower cap', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8f3-9dad-11d1-80b4-00c04fd430c8', 'GLASS-001', 'Drinking Glass', 'แก้วน้ำ', 'Glass tumbler', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active'),
('6ba7b8f4-9dad-11d1-80b4-00c04fd430c8', 'REMOTE-001', 'TV Remote', 'รีโมททีวี', 'Television remote control', (SELECT id FROM "TENANT_DUMMY"."tb_unit" WHERE name = 'PCS'), 'active');


-- (20) Insert Product Info
INSERT INTO "TENANT_DUMMY"."tb_product_info" (id, product_id, product_item_group_id, is_ingredients, price, tax_type, tax_rate) VALUES
('6ba7b8f1-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SOAP-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101001'), false, 50.00, 'vat', 7),
('6ba7b8f2-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SHAM-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101001'), false, 80.00, 'vat', 7),
('6ba7b8f3-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'TOWEL-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '501001'), false, 250.00, 'vat', 7),
('6ba7b8f4-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'TISSUE-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101001'), false, 45.00, 'vat', 7),
('6ba7b8f5-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'WATER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101003'), false, 25.00, 'vat', 7),
('6ba7b8f6-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SNACK-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101004'), false, 120.00, 'vat', 7),
('6ba7b8f7-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'CLEAN-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '201001'), false, 180.00, 'vat', 7),
('6ba7b8f8-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SHEET-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101002'), false, 850.00, 'vat', 7),
('6ba7b8f9-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'PILLOW-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101002'), false, 350.00, 'vat', 7),
('6ba7b8fa-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'PAPER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_product_item_group" WHERE code = '101001'), false, 35.00, 'vat', 7);

-- (21) Insert Product Locations
INSERT INTO "TENANT_DUMMY"."tb_product_location" (id, product_id, location_id) VALUES
('6ba7b901-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SOAP-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Main Warehouse')),
('6ba7b902-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SHAM-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Main Warehouse')),
('6ba7b903-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'TOWEL-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Main Warehouse')),
('6ba7b904-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'TISSUE-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Main Warehouse')),
('6ba7b905-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'WATER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'HK Store Room')),
('6ba7b906-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SNACK-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'HK Store Room')),
('6ba7b907-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'CLEAN-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'HK Store Room')),
('6ba7b908-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SHEET-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'HK Store Room')),
('6ba7b909-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'PILLOW-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'F&B Storage')),
('6ba7b910-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'PAPER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'F&B Storage')),
('6ba7b911-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'COND-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'F&B Storage')),
('6ba7b912-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SLIPPER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'F&B Storage')),
('6ba7b913-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'COFFEE-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b914-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'TEA-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b915-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'HANGER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b916-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'LOTION-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b917-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'DENTAL-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b918-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'SHOWER-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b919-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'GLASS-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop')),
('6ba7b920-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_product" WHERE code = 'REMOTE-001'), (SELECT id FROM "TENANT_DUMMY"."tb_location" WHERE name = 'Engineering Workshop'));

-- (22) Insert Department Users
INSERT INTO "TENANT_DUMMY"."tb_department_user" (id, department_id, user_id, hod) VALUES
('6ba7b930-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Housekeeping'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), true),
('6ba7b931-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Housekeeping'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), false),
('6ba7b932-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'F&B'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), true),
('6ba7b933-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'F&B'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), false),
('6ba7b934-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Engineering'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), true),
('6ba7b935-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Engineering'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), false),
('6ba7b936-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Front Office'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), true),
('6ba7b937-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Front Office'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'user@carmensoftware.com'), false),
('6ba7b938-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Sales'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'admin@carmensoftware.com'), true),
('6ba7b939-9dad-11d1-80b4-00c04fd430c8', (SELECT id FROM "TENANT_DUMMY"."tb_department" WHERE name = 'Sales'), (SELECT id FROM "CARMEN_SYSTEM"."tb_user" WHERE username = 'test@carmensoftware.com'), false);
