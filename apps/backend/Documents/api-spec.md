# API Specification

เอาไปใช้กับ Swagger เป็นตัวอย่างครับ

## Path

- /system-api/v1/ = System API (สำหรับบริหารจัดการระบบทั้งหมด)
- /api/v1/ = Application API (สำหรับบริหารจัดการร้านค้า)
- /api/config/v1/ = Application Config API (สำหรับบริหารจัดการการตั้งค่าร้านค้า)

## System API

เป็น api สำหรับบริหารจัดการระบบทั้งหมด เช่น การสร้างผู้ใช้งาน (User) การสร้างบริษัทหรือ Hotel chain (Cluster) การสร้างร้านค้า (Business Unit) ฯลฯ
path เริ่มต้นจะเป็น /system-api/v1/ เพื่อให้สามารถใช้งานได้ทั้งหมดที่มีการเชื่อมต่อกับระบบทั้งหมด

### Cluster (บริษัท หรือ Hotel chain)

- [ ] GET /system-api/v1/clusters - Get all clusters with pagination and filters
  Description : แสดงรายการบริษัททั้งหมดที่มีอยู่ในระบบ
  Actor : Support User

  Request :
  {
    header : {x-tenent-id, authorization},
    queryParams : {
      page : หน้าที่ต้องการดู
      limit : จำนวนที่ต้องการดู
      search : ค้นหาด้วยชื่อหรือรหัสบริษัท
    }
  }

  Response :
  data :
  {
    "data": [
      {
        "id": "1",
        "name": "Cluster 1",
        "code": "CL1",
        "status": "active",
        "created_at": "2021-01-01 10:00:00",
        "updated_at": "2021-01-01 10:00:00"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }

- [ ] GET /system-api/v1/clusters/:id - Get cluster by ID
  Description : แสดงรายละเอียดของบริษัทที่ต้องการดู
  Actor : Support User

  Request :
  - id : รหัสบริษัท

  Response :
    data :
    {
        "id": "1",
        "name": "Cluster 1",
        "code": "CL1",
        "status": "active",
    }

- [ ] POST /system-api/v1/clusters - Create cluster
    Description : สร้างบริษัทใหม่
    Actor : Support User

    Request :
    {
        "name": "Cluster 1",
        "code": "CL1",
        "status": "active",
    }

    Response :
    {
        "id": "1"
    }

- [ ] PATCH /system-api/v1/clusters/:id - Update cluster
    Description : แก้ไขข้อมูลบริษัท
    Actor : Support User

    Request :
    {
        "name": "Cluster 1",
        "code": "CL1",
        "status": "active",
    }

    Response :
    {
        "id": "1"
    }

- [ ] DELETE /system-api/v1/clusters/:id - Delete cluster
    Description : ลบบริษัท
    Actor : Support User

### Users

- [ ] GET /system-api/v1/users - Get all users with pagination and filters
- [ ] GET /system-api/v1/users/:id - Get user by ID
- [ ] POST /system-api/v1/users - Create new user
- [ ] PATCH /system-api/v1/users/:id - Update user
- [ ] DELETE /system-api/v1/users/:id - Delete user

### Authentication

- [ ] POST /system-api/v1/auth/login - Login
- [ ] POST /system-api/v1/auth/refresh - Refresh token
- [ ] POST /system-api/v1/auth/logout - Logout

### Business Units

- [ ] GET /system-api/v1/business-units - Get all business units
- [ ] GET /system-api/v1/business-units/:id - Get business unit by ID
- [ ] POST /system-api/v1/business-units - Create business unit
- [ ] PATCH /system-api/v1/business-units/:id - Update business unit
- [ ] DELETE /system-api/v1/business-units/:id - Delete business unit

### Products

- [ ] GET /system-api/v1/products - Get all products
- [ ] GET /system-api/v1/products/:id - Get product by ID
- [ ] POST /system-api/v1/products - Create product
- [ ] PATCH /system-api/v1/products/:id - Update product
- [ ] DELETE /system-api/v1/products/:id - Delete product

### Locations

- [ ] GET /system-api/v1/locations - Get all locations
- [ ] GET /system-api/v1/locations/:id - Get location by ID
- [ ] POST /system-api/v1/locations - Create location
- [ ] PATCH /system-api/v1/locations/:id - Update location
- [ ] DELETE /system-api/v1/locations/:id - Delete location

### Departments

- [ ] GET /system-api/v1/departments - Get all departments
- [ ] GET /system-api/v1/departments/:id - Get department by ID
- [ ] POST /system-api/v1/departments - Create department
- [ ] PATCH /system-api/v1/departments/:id - Update department
- [ ] DELETE /system-api/v1/departments/:id - Delete department

### Units

- [ ] GET /system-api/v1/units - Get all units
- [ ] GET /system-api/v1/units/:id - Get unit by ID
- [ ] POST /system-api/v1/units - Create unit
- [ ] PATCH /system-api/v1/units/:id - Update unit
- [ ] DELETE /system-api/v1/units/:id - Delete unit

### Currencies

- [ ] GET /system-api/v1/currencies - Get all currencies
- [ ] GET /system-api/v1/currencies/:id - Get currency by ID
- [ ] POST /system-api/v1/currencies - Create currency
- [ ] PATCH /system-api/v1/currencies/:id - Update currency
- [ ] DELETE /system-api/v1/currencies/:id - Delete currency

### Exchange Rates

- [ ] GET /system-api/v1/exchange-rates - Get all exchange rates
- [ ] GET /system-api/v1/exchange-rates/:id - Get exchange rate by ID
- [ ] POST /system-api/v1/exchange-rates - Create exchange rate
- [ ] PATCH /system-api/v1/exchange-rates/:id - Update exchange rate
- [ ] DELETE /system-api/v1/exchange-rates/:id - Delete exchange rate

### Menus

- [ ] GET /system-api/v1/menus - Get all menus
- [ ] GET /system-api/v1/menus/:id - Get menu by ID
- [ ] POST /system-api/v1/menus - Create menu
- [ ] PATCH /system-api/v1/menus/:id - Update menu
- [ ] DELETE /system-api/v1/menus/:id - Delete menu

### Delivery Points

- [ ] GET /system-api/v1/delivery-points - Get all delivery points
- [ ] GET /system-api/v1/delivery-points/:id - Get delivery point by ID
- [ ] POST /system-api/v1/delivery-points - Create delivery point
- [ ] PATCH /system-api/v1/delivery-points/:id - Update delivery point
- [ ] DELETE /system-api/v1/delivery-points/:id - Delete delivery point

### Purchase Requests

- [ ] GET /system-api/v1/purchase-requests - Get all purchase requests
- [ ] GET /system-api/v1/purchase-requests/:id - Get purchase request by ID
- [ ] POST /system-api/v1/purchase-requests - Create purchase request
- [ ] PATCH /system-api/v1/purchase-requests/:id - Update purchase request
- [ ] DELETE /system-api/v1/purchase-requests/:id - Delete purchase request

### Purchase Orders

- [ ] GET /system-api/v1/purchase-orders - Get all purchase orders
- [ ] GET /system-api/v1/purchase-orders/:id - Get purchase order by ID
- [ ] POST /system-api/v1/purchase-orders - Create purchase order
- [ ] PATCH /system-api/v1/purchase-orders/:id - Update purchase order
- [ ] DELETE /system-api/v1/purchase-orders/:id - Delete purchase order

### Inventory

- [ ] GET /system-api/v1/inventory/transactions - Get all inventory transactions
- [ ] GET /system-api/v1/inventory/adjustments - Get all inventory adjustments
- [ ] POST /system-api/v1/inventory/adjustments - Create inventory adjustment

### Store Requisitions

- [ ] GET /system-api/v1/store-requisitions - Get all store requisitions
- [ ] GET /system-api/v1/store-requisitions/:id - Get store requisition by ID
- [ ] POST /system-api/v1/store-requisitions - Create store requisition
- [ ] PATCH /system-api/v1/store-requisitions/:id - Update store requisition
- [ ] DELETE /system-api/v1/store-requisitions/:id - Delete store requisition

### Stock Management

- [ ] GET /system-api/v1/stock/in - Get all stock in records
- [ ] GET /system-api/v1/stock/out - Get all stock out records
- [ ] GET /system-api/v1/stock/transfers - Get all stock transfers
- [ ] GET /system-api/v1/stock/counts - Get all stock counts
- [ ] POST /system-api/v1/stock/take - Create stock take
- [ ] GET /system-api/v1/stock/take/:id - Get stock take by ID
- [ ] PATCH /system-api/v1/stock/take/:id - Update stock take

## Application API

เป็น api สำหรับบริหารจัดการร้านค้า โดยจะใช้ user token และ x-tenent-id เป็นตัวระบุร้านค้า
