-- (1) Insert Currency ISO-4217 Codes
INSERT INTO "CARMEN_SYSTEM"."tb_currency_iso" (id, iso_code, symbol, name) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'AED', 'د.إ', 'United Arab Emirates dirham'),
('550e8400-e29b-41d4-a716-446655440000', 'AFN', '؋', 'Afghan afghani'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'ALL', 'L', 'Albanian lek'),
('6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'AMD', '֏', 'Armenian dram'),
('6ba7b812-9dad-11d1-80b4-00c04fd430c8', 'ANG', 'ƒ', 'Netherlands Antillean guilder'),
('6ba7b813-9dad-11d1-80b4-00c04fd430c8', 'AOA', 'Kz', 'Angolan kwanza'),
('6ba7b814-9dad-11d1-80b4-00c04fd430c8', 'ARS', '$', 'Argentine peso'),
('6ba7b815-9dad-11d1-80b4-00c04fd430c8', 'AUD', '$', 'Australian dollar'),
('6ba7b816-9dad-11d1-80b4-00c04fd430c8', 'AWG', 'ƒ', 'Aruban florin'),
('6ba7b817-9dad-11d1-80b4-00c04fd430c8', 'AZN', '₼', 'Azerbaijani manat'),
('6ba7b818-9dad-11d1-80b4-00c04fd430c8', 'BAM', 'KM', 'Bosnia and Herzegovina convertible mark'),
('6ba7b819-9dad-11d1-80b4-00c04fd430c8', 'BBD', '$', 'Barbados dollar'),
('6ba7b81a-9dad-11d1-80b4-00c04fd430c8', 'BDT', '৳', 'Bangladeshi taka'),
('6ba7b81b-9dad-11d1-80b4-00c04fd430c8', 'BGN', 'лв', 'Bulgarian lev'),
('6ba7b81c-9dad-11d1-80b4-00c04fd430c8', 'BHD', '.د.ب', 'Bahraini dinar'),
('6ba7b81d-9dad-11d1-80b4-00c04fd430c8', 'BIF', 'FBu', 'Burundian franc'),
('6ba7b81e-9dad-11d1-80b4-00c04fd430c8', 'BMD', '$', 'Bermudian dollar'),
('6ba7b81f-9dad-11d1-80b4-00c04fd430c8', 'BND', '$', 'Brunei dollar'),
('6ba7b820-9dad-11d1-80b4-00c04fd430c8', 'BOB', 'Bs.', 'Boliviano'),
('6ba7b821-9dad-11d1-80b4-00c04fd430c8', 'BRL', 'R$', 'Brazilian real'),
('6ba7b822-9dad-11d1-80b4-00c04fd430c8', 'BSD', '$', 'Bahamian dollar'),
('6ba7b823-9dad-11d1-80b4-00c04fd430c8', 'BTN', 'Nu.', 'Bhutanese ngultrum'),
('6ba7b824-9dad-11d1-80b4-00c04fd430c8', 'BWP', 'P', 'Botswana pula'),
('6ba7b825-9dad-11d1-80b4-00c04fd430c8', 'BYN', 'Br', 'Belarusian ruble'),
('6ba7b826-9dad-11d1-80b4-00c04fd430c8', 'BZD', 'BZ$', 'Belize dollar'),
('6ba7b827-9dad-11d1-80b4-00c04fd430c8', 'CAD', '$', 'Canadian dollar'),
('6ba7b828-9dad-11d1-80b4-00c04fd430c8', 'CDF', 'FC', 'Congolese franc'),
('6ba7b829-9dad-11d1-80b4-00c04fd430c8', 'CHF', 'Fr.', 'Swiss franc'),
('6ba7b82a-9dad-11d1-80b4-00c04fd430c8', 'CLP', '$', 'Chilean peso'),
('6ba7b82b-9dad-11d1-80b4-00c04fd430c8', 'CNY', '¥', 'Chinese yuan'),
('6ba7b82c-9dad-11d1-80b4-00c04fd430c8', 'COP', '$', 'Colombian peso'),
('6ba7b82d-9dad-11d1-80b4-00c04fd430c8', 'CRC', '₡', 'Costa Rican colon'),
('6ba7b82e-9dad-11d1-80b4-00c04fd430c8', 'CUP', '₱', 'Cuban peso'),
('6ba7b82f-9dad-11d1-80b4-00c04fd430c8', 'CVE', '$', 'Cape Verdean escudo'),
('6ba7b830-9dad-11d1-80b4-00c04fd430c8', 'CZK', 'Kč', 'Czech koruna'),
('6ba7b831-9dad-11d1-80b4-00c04fd430c8', 'DJF', 'Fdj', 'Djiboutian franc'),
('6ba7b832-9dad-11d1-80b4-00c04fd430c8', 'DKK', 'kr', 'Danish krone'),
('6ba7b833-9dad-11d1-80b4-00c04fd430c8', 'DOP', 'RD$', 'Dominican peso'),
('6ba7b834-9dad-11d1-80b4-00c04fd430c8', 'DZD', 'د.ج', 'Algerian dinar'),
('6ba7b835-9dad-11d1-80b4-00c04fd430c8', 'EGP', '£', 'Egyptian pound'),
('6ba7b836-9dad-11d1-80b4-00c04fd430c8', 'ERN', 'Nfk', 'Eritrean nakfa'),
('6ba7b837-9dad-11d1-80b4-00c04fd430c8', 'ETB', 'Br', 'Ethiopian birr'),
('6ba7b838-9dad-11d1-80b4-00c04fd430c8', 'EUR', '€', 'Euro'),
('6ba7b839-9dad-11d1-80b4-00c04fd430c8', 'FJD', '$', 'Fiji dollar'),
('6ba7b83a-9dad-11d1-80b4-00c04fd430c8', 'FKP', '£', 'Falkland Islands pound'),
('6ba7b83b-9dad-11d1-80b4-00c04fd430c8', 'GBP', '£', 'Pound sterling'),
('6ba7b83c-9dad-11d1-80b4-00c04fd430c8', 'GEL', '₾', 'Georgian lari'),
('6ba7b83d-9dad-11d1-80b4-00c04fd430c8', 'GHS', '₵', 'Ghanaian cedi'),
('6ba7b83e-9dad-11d1-80b4-00c04fd430c8', 'GIP', '£', 'Gibraltar pound'),
('6ba7b83f-9dad-11d1-80b4-00c04fd430c8', 'GMD', 'D', 'Gambian dalasi'),
('6ba7b840-9dad-11d1-80b4-00c04fd430c8', 'GNF', 'FG', 'Guinean franc'),
('6ba7b841-9dad-11d1-80b4-00c04fd430c8', 'GTQ', 'Q', 'Guatemalan quetzal'),
('6ba7b842-9dad-11d1-80b4-00c04fd430c8', 'GYD', '$', 'Guyanese dollar'),
('6ba7b843-9dad-11d1-80b4-00c04fd430c8', 'HKD', '$', 'Hong Kong dollar'),
('6ba7b844-9dad-11d1-80b4-00c04fd430c8', 'HNL', 'L', 'Honduran lempira'),
('6ba7b845-9dad-11d1-80b4-00c04fd430c8', 'HRK', 'kn', 'Croatian kuna'),
('6ba7b846-9dad-11d1-80b4-00c04fd430c8', 'HTG', 'G', 'Haitian gourde'),
('6ba7b847-9dad-11d1-80b4-00c04fd430c8', 'HUF', 'Ft', 'Hungarian forint'),
('6ba7b848-9dad-11d1-80b4-00c04fd430c8', 'IDR', 'Rp', 'Indonesian rupiah'),
('6ba7b849-9dad-11d1-80b4-00c04fd430c8', 'ILS', '₪', 'Israeli new shekel'),
('6ba7b84a-9dad-11d1-80b4-00c04fd430c8', 'INR', '₹', 'Indian rupee'),
('6ba7b84b-9dad-11d1-80b4-00c04fd430c8', 'IQD', 'ع.د', 'Iraqi dinar'),
('6ba7b84c-9dad-11d1-80b4-00c04fd430c8', 'IRR', '﷼', 'Iranian rial'),
('6ba7b84d-9dad-11d1-80b4-00c04fd430c8', 'ISK', 'kr', 'Icelandic króna'),
('6ba7b84e-9dad-11d1-80b4-00c04fd430c8', 'JMD', 'J$', 'Jamaican dollar'),
('6ba7b84f-9dad-11d1-80b4-00c04fd430c8', 'JOD', 'د.ا', 'Jordanian dinar'),
('6ba7b850-9dad-11d1-80b4-00c04fd430c8', 'JPY', '¥', 'Japanese yen'),
('6ba7b851-9dad-11d1-80b4-00c04fd430c8', 'KES', 'KSh', 'Kenyan shilling'),
('6ba7b852-9dad-11d1-80b4-00c04fd430c8', 'KGS', 'с', 'Kyrgyzstani som'),
('6ba7b853-9dad-11d1-80b4-00c04fd430c8', 'KHR', '៛', 'Cambodian riel'),
('6ba7b854-9dad-11d1-80b4-00c04fd430c8', 'KMF', 'CF', 'Comoro franc'),
('6ba7b855-9dad-11d1-80b4-00c04fd430c8', 'KPW', '₩', 'North Korean won'),
('6ba7b856-9dad-11d1-80b4-00c04fd430c8', 'KRW', '₩', 'South Korean won'),
('6ba7b857-9dad-11d1-80b4-00c04fd430c8', 'KWD', 'د.ك', 'Kuwaiti dinar'),
('6ba7b858-9dad-11d1-80b4-00c04fd430c8', 'KYD', '$', 'Cayman Islands dollar'),
('6ba7b859-9dad-11d1-80b4-00c04fd430c8', 'KZT', '₸', 'Kazakhstani tenge'),
('6ba7b85a-9dad-11d1-80b4-00c04fd430c8', 'LAK', '₭', 'Lao kip'),
('6ba7b85b-9dad-11d1-80b4-00c04fd430c8', 'LBP', 'ل.ل', 'Lebanese pound'),
('6ba7b85c-9dad-11d1-80b4-00c04fd430c8', 'LKR', 'Rs', 'Sri Lankan rupee'),
('6ba7b85d-9dad-11d1-80b4-00c04fd430c8', 'LRD', '$', 'Liberian dollar'),
('6ba7b85e-9dad-11d1-80b4-00c04fd430c8', 'LSL', 'L', 'Lesotho loti'),
('6ba7b85f-9dad-11d1-80b4-00c04fd430c8', 'LYD', 'ل.د', 'Libyan dinar'),
('6ba7b860-9dad-11d1-80b4-00c04fd430c8', 'MAD', 'د.م.', 'Moroccan dirham'),
('6ba7b861-9dad-11d1-80b4-00c04fd430c8', 'MDL', 'L', 'Moldovan leu'),
('6ba7b862-9dad-11d1-80b4-00c04fd430c8', 'MGA', 'Ar', 'Malagasy ariary'),
('6ba7b863-9dad-11d1-80b4-00c04fd430c8', 'MKD', 'ден', 'Macedonian denar'),
('6ba7b864-9dad-11d1-80b4-00c04fd430c8', 'MMK', 'K', 'Myanmar kyat'),
('6ba7b865-9dad-11d1-80b4-00c04fd430c8', 'MNT', '₮', 'Mongolian tögrög'),
('6ba7b866-9dad-11d1-80b4-00c04fd430c8', 'MOP', 'MOP$', 'Macanese pataca'),
('6ba7b867-9dad-11d1-80b4-00c04fd430c8', 'MRU', 'UM', 'Mauritanian ouguiya'),
('6ba7b868-9dad-11d1-80b4-00c04fd430c8', 'MUR', '₨', 'Mauritian rupee'),
('6ba7b869-9dad-11d1-80b4-00c04fd430c8', 'MVR', '.ރ', 'Maldivian rufiyaa'),
('6ba7b86a-9dad-11d1-80b4-00c04fd430c8', 'MWK', 'MK', 'Malawian kwacha'),
('6ba7b86b-9dad-11d1-80b4-00c04fd430c8', 'MXN', '$', 'Mexican peso'),
('6ba7b86c-9dad-11d1-80b4-00c04fd430c8', 'MYR', 'RM', 'Malaysian ringgit'),
('6ba7b86d-9dad-11d1-80b4-00c04fd430c8', 'MZN', 'MT', 'Mozambican metical'),
('6ba7b86e-9dad-11d1-80b4-00c04fd430c8', 'NAD', '$', 'Namibian dollar'),
('6ba7b86f-9dad-11d1-80b4-00c04fd430c8', 'NGN', '₦', 'Nigerian naira'),
('6ba7b870-9dad-11d1-80b4-00c04fd430c8', 'NIO', 'C$', 'Nicaraguan córdoba'),
('6ba7b871-9dad-11d1-80b4-00c04fd430c8', 'NOK', 'kr', 'Norwegian krone'),
('6ba7b872-9dad-11d1-80b4-00c04fd430c8', 'NPR', '₨', 'Nepalese rupee'),
('6ba7b873-9dad-11d1-80b4-00c04fd430c8', 'NZD', '$', 'New Zealand dollar'),
('6ba7b874-9dad-11d1-80b4-00c04fd430c8', 'OMR', 'ر.ع.', 'Omani rial'),
('6ba7b875-9dad-11d1-80b4-00c04fd430c8', 'PAB', 'B/.', 'Panamanian balboa'),
('6ba7b876-9dad-11d1-80b4-00c04fd430c8', 'PEN', 'S/.', 'Peruvian sol'),
('6ba7b877-9dad-11d1-80b4-00c04fd430c8', 'PGK', 'K', 'Papua New Guinean kina'),
('6ba7b878-9dad-11d1-80b4-00c04fd430c8', 'PHP', '₱', 'Philippine peso'),
('6ba7b879-9dad-11d1-80b4-00c04fd430c8', 'PKR', '₨', 'Pakistani rupee'),
('6ba7b87a-9dad-11d1-80b4-00c04fd430c8', 'PLN', 'zł', 'Polish złoty'),
('6ba7b87b-9dad-11d1-80b4-00c04fd430c8', 'PYG', '₲', 'Paraguayan guaraní'),
('6ba7b87c-9dad-11d1-80b4-00c04fd430c8', 'QAR', 'ر.ق', 'Qatari riyal'),
('6ba7b87d-9dad-11d1-80b4-00c04fd430c8', 'RON', 'lei', 'Romanian leu'),
('6ba7b87e-9dad-11d1-80b4-00c04fd430c8', 'RSD', 'дин.', 'Serbian dinar'),
('6ba7b87f-9dad-11d1-80b4-00c04fd430c8', 'RUB', '₽', 'Russian ruble'),
('6ba7b880-9dad-11d1-80b4-00c04fd430c8', 'RWF', 'FRw', 'Rwandan franc'),
('6ba7b881-9dad-11d1-80b4-00c04fd430c8', 'SAR', 'ر.س', 'Saudi riyal'),
('6ba7b882-9dad-11d1-80b4-00c04fd430c8', 'SBD', '$', 'Solomon Islands dollar'),
('6ba7b883-9dad-11d1-80b4-00c04fd430c8', 'SCR', '₨', 'Seychelles rupee'),
('6ba7b884-9dad-11d1-80b4-00c04fd430c8', 'SDG', 'ج.س.', 'Sudanese pound'),
('6ba7b885-9dad-11d1-80b4-00c04fd430c8', 'SEK', 'kr', 'Swedish krona'),
('6ba7b886-9dad-11d1-80b4-00c04fd430c8', 'SGD', '$', 'Singapore dollar'),
('6ba7b887-9dad-11d1-80b4-00c04fd430c8', 'SHP', '£', 'Saint Helena pound'),
('6ba7b888-9dad-11d1-80b4-00c04fd430c8', 'SLL', 'Le', 'Sierra Leonean leone'),
('6ba7b889-9dad-11d1-80b4-00c04fd430c8', 'SOS', 'S', 'Somali shilling'),
('6ba7b88a-9dad-11d1-80b4-00c04fd430c8', 'SRD', '$', 'Surinamese dollar'),
('6ba7b88b-9dad-11d1-80b4-00c04fd430c8', 'SSP', '£', 'South Sudanese pound'),
('6ba7b88c-9dad-11d1-80b4-00c04fd430c8', 'STN', 'Db', 'São Tomé and Príncipe dobra'),
('6ba7b88d-9dad-11d1-80b4-00c04fd430c8', 'SVC', '$', 'Salvadoran colón'),
('6ba7b88e-9dad-11d1-80b4-00c04fd430c8', 'SYP', '£', 'Syrian pound'),
('6ba7b88f-9dad-11d1-80b4-00c04fd430c8', 'SZL', 'L', 'Swazi lilangeni'),
('6ba7b890-9dad-11d1-80b4-00c04fd430c8', 'THB', '฿', 'Thai baht'),
('6ba7b891-9dad-11d1-80b4-00c04fd430c8', 'TJS', 'ЅМ', 'Tajikistani somoni'),
('6ba7b892-9dad-11d1-80b4-00c04fd430c8', 'TMT', 'm', 'Turkmenistan manat'),
('6ba7b893-9dad-11d1-80b4-00c04fd430c8', 'TND', 'د.ت', 'Tunisian dinar'),
('6ba7b894-9dad-11d1-80b4-00c04fd430c8', 'TOP', 'T$', 'Tongan paʻanga'),
('6ba7b895-9dad-11d1-80b4-00c04fd430c8', 'TRY', '₺', 'Turkish lira'),
('6ba7b896-9dad-11d1-80b4-00c04fd430c8', 'TTD', 'TT$', 'Trinidad and Tobago dollar'),
('6ba7b897-9dad-11d1-80b4-00c04fd430c8', 'TWD', 'NT$', 'New Taiwan dollar'),
('6ba7b898-9dad-11d1-80b4-00c04fd430c8', 'TZS', 'TSh', 'Tanzanian shilling'),
('6ba7b899-9dad-11d1-80b4-00c04fd430c8', 'UAH', '₴', 'Ukrainian hryvnia'),
('6ba7b89a-9dad-11d1-80b4-00c04fd430c8', 'UGX', 'USh', 'Ugandan shilling'),
('6ba7b89b-9dad-11d1-80b4-00c04fd430c8', 'USD', '$', 'United States dollar'),
('6ba7b89c-9dad-11d1-80b4-00c04fd430c8', 'UYU', '$U', 'Uruguayan peso'),
('6ba7b89d-9dad-11d1-80b4-00c04fd430c8', 'UZS', 'лв', 'Uzbekistan som'),
('6ba7b89e-9dad-11d1-80b4-00c04fd430c8', 'VES', 'Bs', 'Venezuelan bolívar soberano'),
('6ba7b89f-9dad-11d1-80b4-00c04fd430c8', 'VND', '₫', 'Vietnamese đồng'),
('6ba7b8a0-9dad-11d1-80b4-00c04fd430c8', 'VUV', 'VT', 'Vanuatu vatu'),
('6ba7b8a1-9dad-11d1-80b4-00c04fd430c8', 'WST', 'WS$', 'Samoan tala'),
('6ba7b8a2-9dad-11d1-80b4-00c04fd430c8', 'XAF', 'FCFA', 'CFA franc BEAC'),
('6ba7b8a3-9dad-11d1-80b4-00c04fd430c8', 'XCD', '$', 'East Caribbean dollar'),
('6ba7b8a4-9dad-11d1-80b4-00c04fd430c8', 'XOF', 'CFA', 'CFA franc BCEAO'),
('6ba7b8a5-9dad-11d1-80b4-00c04fd430c8', 'XPF', '₣', 'CFP franc'),
('6ba7b8a6-9dad-11d1-80b4-00c04fd430c8', 'YER', '﷼', 'Yemeni rial'),
('6ba7b8a7-9dad-11d1-80b4-00c04fd430c8', 'ZAR', 'R', 'South African rand'),
('6ba7b8a8-9dad-11d1-80b4-00c04fd430c8', 'ZMW', 'ZK', 'Zambian kwacha'),
('6ba7b8a9-9dad-11d1-80b4-00c04fd430c8', 'ZWL', '$', 'Zimbabwean dollar');

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
