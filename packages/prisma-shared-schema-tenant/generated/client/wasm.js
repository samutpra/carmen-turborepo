
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Tb_activityScalarFieldEnum = {
  id: 'id',
  action: 'action',
  entity_type: 'entity_type',
  entity_id: 'entity_id',
  actor_id: 'actor_id',
  meta_data: 'meta_data',
  old_data: 'old_data',
  new_data: 'new_data',
  ip_address: 'ip_address',
  user_agent: 'user_agent',
  description: 'description',
  created_at: 'created_at',
  created_by_id: 'created_by_id'
};

exports.Prisma.RelationLoadStrategy = {
  query: 'query',
  join: 'join'
};

exports.Prisma.Tb_credit_noteScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_credit_note_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  credit_note_id: 'credit_note_id',
  name: 'name',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  amount: 'amount',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_currencyScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  symbol: 'symbol',
  description: 'description',
  is_active: 'is_active',
  exchange_rate: 'exchange_rate',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_delivery_pointScalarFieldEnum = {
  id: 'id',
  name: 'name',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_departmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_exchange_rateScalarFieldEnum = {
  id: 'id',
  at_date: 'at_date',
  currency_id: 'currency_id',
  exchange_rate: 'exchange_rate',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_good_receive_noteScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_good_receive_note_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  good_receive_note_id: 'good_receive_note_id',
  purchase_order_detail_id: 'purchase_order_detail_id',
  location_id: 'location_id',
  product_id: 'product_id',
  product_name: 'product_name',
  received_qty: 'received_qty',
  received_unit_id: 'received_unit_id',
  received_unit_name: 'received_unit_name',
  is_foc: 'is_foc',
  price: 'price',
  tax_amount: 'tax_amount',
  total_amount: 'total_amount',
  delivery_point_id: 'delivery_point_id',
  base_price: 'base_price',
  base_qty: 'base_qty',
  extra_cost: 'extra_cost',
  total_cost: 'total_cost',
  is_discount: 'is_discount',
  discount_amount: 'discount_amount',
  is_tax_adjustment: 'is_tax_adjustment',
  lot_number: 'lot_number',
  expired_date: 'expired_date',
  info: 'info',
  comment: 'comment',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_inventory_transactionScalarFieldEnum = {
  id: 'id',
  inventory_doc_type: 'inventory_doc_type',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_inventory_transaction_closing_balanceScalarFieldEnum = {
  id: 'id',
  inventory_transaction_detail_id: 'inventory_transaction_detail_id',
  lot_name: 'lot_name',
  lot_index: 'lot_index',
  qty: 'qty',
  cost: 'cost',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_inventory_transaction_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  from_lot_name: 'from_lot_name',
  current_lot_name: 'current_lot_name',
  qty: 'qty',
  unit_cost: 'unit_cost',
  total_cost: 'total_cost',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_locationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location_type: 'location_type',
  description: 'description',
  info: 'info',
  is_active: 'is_active',
  delivery_point_id: 'delivery_point_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_menuScalarFieldEnum = {
  id: 'id',
  module_id: 'module_id',
  name: 'name',
  url: 'url',
  description: 'description',
  is_visible: 'is_visible',
  is_active: 'is_active',
  is_lock: 'is_lock',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_productScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  local_name: 'local_name',
  description: 'description',
  inventory_unit_id: 'inventory_unit_id',
  inventory_unit_name: 'inventory_unit_name',
  product_status_type: 'product_status_type',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_categoryScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_infoScalarFieldEnum = {
  id: 'id',
  product_id: 'product_id',
  product_item_group_id: 'product_item_group_id',
  is_ingredients: 'is_ingredients',
  price: 'price',
  tax_type: 'tax_type',
  tax_rate: 'tax_rate',
  price_deviation_limit: 'price_deviation_limit',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_item_groupScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  product_subcategory_id: 'product_subcategory_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_sub_categoryScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  product_category_id: 'product_category_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_tb_vendorScalarFieldEnum = {
  id: 'id',
  product_id: 'product_id',
  product_name: 'product_name',
  vendor_id: 'vendor_id',
  vendor_product_name: 'vendor_product_name',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_purchase_orderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  purchase_order_status: 'purchase_order_status',
  description: 'description',
  order_date: 'order_date',
  delivery_date: 'delivery_date',
  vendor_id: 'vendor_id',
  vendor_name: 'vendor_name',
  currency_id: 'currency_id',
  currency_name: 'currency_name',
  base_currency_id: 'base_currency_id',
  base_currency_name: 'base_currency_name',
  exchange_rate: 'exchange_rate',
  notes: 'notes',
  approval_date: 'approval_date',
  email: 'email',
  buyer_name: 'buyer_name',
  credit_term: 'credit_term',
  remarks: 'remarks',
  info: 'info',
  history: 'history',
  is_active: 'is_active',
  doc_version: 'doc_version',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_purchase_order_detailScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  purchase_order_id: 'purchase_order_id',
  purchase_request_detail_id: 'purchase_request_detail_id',
  exchange_rate: 'exchange_rate',
  order_qty: 'order_qty',
  order_unit_id: 'order_unit_id',
  order_unit_name: 'order_unit_name',
  base_qty: 'base_qty',
  base_unit_id: 'base_unit_id',
  base_unit_name: 'base_unit_name',
  unit_price: 'unit_price',
  sub_total_price: 'sub_total_price',
  base_sub_total_price: 'base_sub_total_price',
  is_foc: 'is_foc',
  is_tax_included: 'is_tax_included',
  tax_rate: 'tax_rate',
  tax_amount: 'tax_amount',
  discount_rate: 'discount_rate',
  discount_amount: 'discount_amount',
  net_amount: 'net_amount',
  base_net_amount: 'base_net_amount',
  total_price: 'total_price',
  base_total_price: 'base_total_price',
  info: 'info',
  history: 'history',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_purchase_requestScalarFieldEnum = {
  id: 'id',
  reference_name: 'reference_name',
  purchase_request_date: 'purchase_request_date',
  workflow_id: 'workflow_id',
  workflow_obj: 'workflow_obj',
  workflow_history: 'workflow_history',
  current_workflow_status: 'current_workflow_status',
  purchase_request_status: 'purchase_request_status',
  requestor_id: 'requestor_id',
  department_id: 'department_id',
  job_code: 'job_code',
  budget_code: 'budget_code',
  allocated_budget_amount: 'allocated_budget_amount',
  is_active: 'is_active',
  doc_version: 'doc_version',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_purchase_request_detailScalarFieldEnum = {
  id: 'id',
  purchase_request_id: 'purchase_request_id',
  location_id: 'location_id',
  location_name: 'location_name',
  product_id: 'product_id',
  product_name: 'product_name',
  unit_id: 'unit_id',
  unit_name: 'unit_name',
  vendor_id: 'vendor_id',
  vendor_name: 'vendor_name',
  price_list_id: 'price_list_id',
  description: 'description',
  requested_qty: 'requested_qty',
  approved_qty: 'approved_qty',
  currency_id: 'currency_id',
  exchange_rate: 'exchange_rate',
  exchange_rate_date: 'exchange_rate_date',
  price: 'price',
  total_price: 'total_price',
  foc: 'foc',
  is_tax_included: 'is_tax_included',
  is_tax_adjustment: 'is_tax_adjustment',
  is_discount: 'is_discount',
  discount_rate: 'discount_rate',
  discount_amount: 'discount_amount',
  tax_rate: 'tax_rate',
  tax_amount: 'tax_amount',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_inScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_in_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  stock_in_id: 'stock_in_id',
  name: 'name',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_outScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_out_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  stock_out_id: 'stock_out_id',
  name: 'name',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_takeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_stock_take_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  stock_take_id: 'stock_take_id',
  name: 'name',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_store_requisitionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ref_no: 'ref_no',
  doc_status: 'doc_status',
  workflow: 'workflow',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_store_requisition_detailScalarFieldEnum = {
  id: 'id',
  inventory_transaction_id: 'inventory_transaction_id',
  store_requisition_id: 'store_requisition_id',
  name: 'name',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_unitScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_unit_conversionScalarFieldEnum = {
  id: 'id',
  product_id: 'product_id',
  unit_type: 'unit_type',
  from_unit_id: 'from_unit_id',
  from_unit_name: 'from_unit_name',
  from_unit_qty: 'from_unit_qty',
  to_unit_id: 'to_unit_id',
  to_unit_name: 'to_unit_name',
  to_unit_qty: 'to_unit_qty',
  is_default: 'is_default',
  description: 'description',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_vendorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  info: 'info',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_vendor_addressScalarFieldEnum = {
  id: 'id',
  vendor_id: 'vendor_id',
  address_type: 'address_type',
  address: 'address',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_vendor_contactScalarFieldEnum = {
  id: 'id',
  vendor_id: 'vendor_id',
  contact_type: 'contact_type',
  description: 'description',
  is_active: 'is_active',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_workflowScalarFieldEnum = {
  id: 'id',
  name: 'name',
  workflow_type: 'workflow_type',
  description: 'description',
  data: 'data',
  is_active: 'is_active',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_count_stockScalarFieldEnum = {
  id: 'id',
  start_date: 'start_date',
  end_date: 'end_date',
  location_id: 'location_id',
  notes: 'notes',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_count_stock_detailScalarFieldEnum = {
  id: 'id',
  count_stock_id: 'count_stock_id',
  product_id: 'product_id',
  product_name: 'product_name',
  qty: 'qty',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_jv_detailScalarFieldEnum = {
  id: 'id',
  jv_header_id: 'jv_header_id',
  account_department_id: 'account_department_id',
  account_name: 'account_name',
  currency_id: 'currency_id',
  exchange_rate: 'exchange_rate',
  debit: 'debit',
  credit: 'credit',
  base_currency_id: 'base_currency_id',
  base_debit: 'base_debit',
  base_credit: 'base_credit',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_jv_headerScalarFieldEnum = {
  id: 'id',
  currency_id: 'currency_id',
  exchange_rate: 'exchange_rate',
  base_currency_id: 'base_currency_id',
  jv_type: 'jv_type',
  jv_number: 'jv_number',
  jv_date: 'jv_date',
  jv_description: 'jv_description',
  jv_status: 'jv_status',
  workflow: 'workflow',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_price_listScalarFieldEnum = {
  id: 'id',
  vendor_id: 'vendor_id',
  from_date: 'from_date',
  to_date: 'to_date',
  product_id: 'product_id',
  product_name: 'product_name',
  price: 'price',
  unit_id: 'unit_id',
  unit_name: 'unit_name',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_product_locationScalarFieldEnum = {
  id: 'id',
  product_id: 'product_id',
  location_id: 'location_id'
};

exports.Prisma.Tb_department_userScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  department_id: 'department_id',
  is_hod: 'is_hod'
};

exports.Prisma.Tb_attachmentScalarFieldEnum = {
  id: 'id',
  filename: 'filename',
  filetype: 'filetype',
  data: 'data',
  info: 'info'
};

exports.Prisma.Tb_currency_commentScalarFieldEnum = {
  id: 'id',
  type: 'type',
  user_id: 'user_id',
  message: 'message',
  attachments: 'attachments',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_unit_commentScalarFieldEnum = {
  id: 'id',
  type: 'type',
  user_id: 'user_id',
  message: 'message',
  attachments: 'attachments',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_user_locationScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  location_id: 'location_id'
};

exports.Prisma.Tb_config_running_codeScalarFieldEnum = {
  id: 'id',
  type: 'type',
  config: 'config',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.enum_activity_action = exports.$Enums.enum_activity_action = {
  view: 'view',
  create: 'create',
  update: 'update',
  delete: 'delete',
  login: 'login',
  other: 'other'
};

exports.enum_activity_entity_type = exports.$Enums.enum_activity_entity_type = {
  user: 'user',
  business_unit: 'business_unit',
  product: 'product',
  location: 'location',
  department: 'department',
  unit: 'unit',
  currency: 'currency',
  exchange_rate: 'exchange_rate',
  menu: 'menu',
  delivery_point: 'delivery_point',
  purchase_request: 'purchase_request',
  purchase_request_item: 'purchase_request_item',
  purchase_order: 'purchase_order',
  purchase_order_item: 'purchase_order_item',
  inventory_transaction: 'inventory_transaction',
  inventory_adjustment: 'inventory_adjustment',
  store_requisition: 'store_requisition',
  store_requisition_item: 'store_requisition_item',
  stock_in: 'stock_in',
  stock_out: 'stock_out',
  stock_adjustment: 'stock_adjustment',
  stock_transfer: 'stock_transfer',
  stock_count: 'stock_count',
  stock_take: 'stock_take',
  stock_take_item: 'stock_take_item',
  other: 'other'
};

exports.enum_doc_status = exports.$Enums.enum_doc_status = {
  draft: 'draft',
  complete: 'complete',
  void: 'void'
};

exports.enum_inventory_doc_type = exports.$Enums.enum_inventory_doc_type = {
  good_receive_note: 'good_receive_note',
  credit_note: 'credit_note',
  store_requisition: 'store_requisition',
  stock_in: 'stock_in',
  stock_out: 'stock_out',
  stock_take: 'stock_take'
};

exports.enum_location_type = exports.$Enums.enum_location_type = {
  inventory: 'inventory',
  direct: 'direct',
  consignment: 'consignment'
};

exports.enum_product_status_type = exports.$Enums.enum_product_status_type = {
  active: 'active',
  inactive: 'inactive',
  discontinued: 'discontinued'
};

exports.enum_tax_type = exports.$Enums.enum_tax_type = {
  none: 'none',
  vat: 'vat'
};

exports.enum_purchase_order_doc_status = exports.$Enums.enum_purchase_order_doc_status = {
  open: 'open',
  voided: 'voided',
  closed: 'closed',
  draft: 'draft',
  sent: 'sent',
  partial: 'partial',
  fully_received: 'fully_received',
  cancelled: 'cancelled',
  deleted: 'deleted'
};

exports.enum_purchase_request_doc_status = exports.$Enums.enum_purchase_request_doc_status = {
  draft: 'draft',
  work_in_process: 'work_in_process',
  complete: 'complete',
  complete_purchase_order: 'complete_purchase_order'
};

exports.enum_unit_type = exports.$Enums.enum_unit_type = {
  order_unit: 'order_unit',
  ingredient_unit: 'ingredient_unit'
};

exports.enum_vendor_address_type = exports.$Enums.enum_vendor_address_type = {
  contact_address: 'contact_address',
  mailing_address: 'mailing_address',
  register_address: 'register_address'
};

exports.enum_vendor_contact_type = exports.$Enums.enum_vendor_contact_type = {
  phone: 'phone',
  email: 'email'
};

exports.enum_workflow_type = exports.$Enums.enum_workflow_type = {
  purchase_request: 'purchase_request',
  purchase_order: 'purchase_order',
  store_requisition: 'store_requisition'
};

exports.enum_jv_status = exports.$Enums.enum_jv_status = {
  draft: 'draft',
  posted: 'posted'
};

exports.enum_comment_type = exports.$Enums.enum_comment_type = {
  user: 'user',
  system: 'system'
};

exports.Prisma.ModelName = {
  tb_activity: 'tb_activity',
  tb_credit_note: 'tb_credit_note',
  tb_credit_note_detail: 'tb_credit_note_detail',
  tb_currency: 'tb_currency',
  tb_delivery_point: 'tb_delivery_point',
  tb_department: 'tb_department',
  tb_exchange_rate: 'tb_exchange_rate',
  tb_good_receive_note: 'tb_good_receive_note',
  tb_good_receive_note_detail: 'tb_good_receive_note_detail',
  tb_inventory_transaction: 'tb_inventory_transaction',
  tb_inventory_transaction_closing_balance: 'tb_inventory_transaction_closing_balance',
  tb_inventory_transaction_detail: 'tb_inventory_transaction_detail',
  tb_location: 'tb_location',
  tb_menu: 'tb_menu',
  tb_product: 'tb_product',
  tb_product_category: 'tb_product_category',
  tb_product_info: 'tb_product_info',
  tb_product_item_group: 'tb_product_item_group',
  tb_product_sub_category: 'tb_product_sub_category',
  tb_product_tb_vendor: 'tb_product_tb_vendor',
  tb_purchase_order: 'tb_purchase_order',
  tb_purchase_order_detail: 'tb_purchase_order_detail',
  tb_purchase_request: 'tb_purchase_request',
  tb_purchase_request_detail: 'tb_purchase_request_detail',
  tb_stock_in: 'tb_stock_in',
  tb_stock_in_detail: 'tb_stock_in_detail',
  tb_stock_out: 'tb_stock_out',
  tb_stock_out_detail: 'tb_stock_out_detail',
  tb_stock_take: 'tb_stock_take',
  tb_stock_take_detail: 'tb_stock_take_detail',
  tb_store_requisition: 'tb_store_requisition',
  tb_store_requisition_detail: 'tb_store_requisition_detail',
  tb_unit: 'tb_unit',
  tb_unit_conversion: 'tb_unit_conversion',
  tb_vendor: 'tb_vendor',
  tb_vendor_address: 'tb_vendor_address',
  tb_vendor_contact: 'tb_vendor_contact',
  tb_workflow: 'tb_workflow',
  tb_count_stock: 'tb_count_stock',
  tb_count_stock_detail: 'tb_count_stock_detail',
  tb_jv_detail: 'tb_jv_detail',
  tb_jv_header: 'tb_jv_header',
  tb_price_list: 'tb_price_list',
  tb_product_location: 'tb_product_location',
  tb_department_user: 'tb_department_user',
  tb_attachment: 'tb_attachment',
  tb_currency_comment: 'tb_currency_comment',
  tb_unit_comment: 'tb_unit_comment',
  tb_user_location: 'tb_user_location',
  tb_config_running_code: 'tb_config_running_code'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
