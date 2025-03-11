
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

exports.Prisma.Tb_application_roleScalarFieldEnum = {
  id: 'id',
  business_unit_id: 'business_unit_id',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.RelationLoadStrategy = {
  query: 'query',
  join: 'join'
};

exports.Prisma.Tb_application_role_tb_permissionScalarFieldEnum = {
  id: 'id',
  application_role_id: 'application_role_id',
  permission_id: 'permission_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_business_unitScalarFieldEnum = {
  id: 'id',
  cluster_id: 'cluster_id',
  code: 'code',
  name: 'name',
  description: 'description',
  is_hq: 'is_hq',
  is_active: 'is_active',
  db_connection: 'db_connection',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_business_unit_tb_moduleScalarFieldEnum = {
  id: 'id',
  business_unit_id: 'business_unit_id',
  module_id: 'module_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_clusterScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  is_active: 'is_active',
  info: 'info',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_cluster_userScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  cluster_id: 'cluster_id',
  is_active: 'is_active',
  role: 'role',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_currency_isoScalarFieldEnum = {
  id: 'id',
  iso_code: 'iso_code',
  name: 'name',
  symbol: 'symbol'
};

exports.Prisma.Tb_message_formatScalarFieldEnum = {
  id: 'id',
  name: 'name',
  message: 'message',
  is_email: 'is_email',
  is_sms: 'is_sms',
  is_in_app: 'is_in_app',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_moduleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_notificationScalarFieldEnum = {
  id: 'id',
  from_user_id: 'from_user_id',
  to_user_id: 'to_user_id',
  message: 'message',
  is_read: 'is_read',
  is_sent: 'is_sent',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_passwordScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  hash: 'hash',
  is_active: 'is_active',
  expired_on: 'expired_on',
  created_at: 'created_at',
  created_by_id: 'created_by_id'
};

exports.Prisma.Tb_permissionScalarFieldEnum = {
  id: 'id',
  group: 'group',
  name: 'name',
  description: 'description',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_subscriptionScalarFieldEnum = {
  id: 'id',
  cluster_id: 'cluster_id',
  subscription_number: 'subscription_number',
  start_date: 'start_date',
  end_date: 'end_date',
  status: 'status',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_subscription_detailScalarFieldEnum = {
  id: 'id',
  subscription_id: 'subscription_id',
  business_unit_id: 'business_unit_id',
  module_id: 'module_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_userScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  platform_role: 'platform_role',
  is_active: 'is_active',
  is_consent: 'is_consent',
  consent_at: 'consent_at',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_user_login_sessionScalarFieldEnum = {
  id: 'id',
  token: 'token',
  token_type: 'token_type',
  user_id: 'user_id',
  expired_on: 'expired_on'
};

exports.Prisma.Tb_user_profileScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  firstname: 'firstname',
  middlename: 'middlename',
  lastname: 'lastname',
  bio: 'bio',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_user_tb_application_roleScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  application_role_id: 'application_role_id',
  created_at: 'created_at',
  created_by_id: 'created_by_id',
  updated_at: 'updated_at',
  updated_by_id: 'updated_by_id'
};

exports.Prisma.Tb_user_tb_business_unitScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  business_unit_id: 'business_unit_id',
  role: 'role',
  is_default: 'is_default',
  is_active: 'is_active',
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

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.enum_cluster_user_role = exports.$Enums.enum_cluster_user_role = {
  admin: 'admin',
  user: 'user'
};

exports.enum_subscription_status = exports.$Enums.enum_subscription_status = {
  active: 'active',
  inactive: 'inactive',
  expired: 'expired'
};

exports.enum_platform_role = exports.$Enums.enum_platform_role = {
  platform_admin: 'platform_admin',
  support_manager: 'support_manager',
  support_staff: 'support_staff',
  security_officer: 'security_officer',
  integration_developer: 'integration_developer',
  user: 'user'
};

exports.enum_token_type = exports.$Enums.enum_token_type = {
  access_token: 'access_token',
  refresh_token: 'refresh_token'
};

exports.enum_user_business_unit_role = exports.$Enums.enum_user_business_unit_role = {
  admin: 'admin',
  user: 'user'
};

exports.Prisma.ModelName = {
  tb_application_role: 'tb_application_role',
  tb_application_role_tb_permission: 'tb_application_role_tb_permission',
  tb_business_unit: 'tb_business_unit',
  tb_business_unit_tb_module: 'tb_business_unit_tb_module',
  tb_cluster: 'tb_cluster',
  tb_cluster_user: 'tb_cluster_user',
  tb_currency_iso: 'tb_currency_iso',
  tb_message_format: 'tb_message_format',
  tb_module: 'tb_module',
  tb_notification: 'tb_notification',
  tb_password: 'tb_password',
  tb_permission: 'tb_permission',
  tb_subscription: 'tb_subscription',
  tb_subscription_detail: 'tb_subscription_detail',
  tb_user: 'tb_user',
  tb_user_login_session: 'tb_user_login_session',
  tb_user_profile: 'tb_user_profile',
  tb_user_tb_application_role: 'tb_user_tb_application_role',
  tb_user_tb_business_unit: 'tb_user_tb_business_unit'
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
