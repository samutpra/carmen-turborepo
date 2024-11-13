# Generate Prisma Schema

```bash
#  npx prisma generate --schema prisma/schema/system/system.prisma
#  npx prisma generate --schema prisma/schema/tenant/tenant.prisma

#  npx prisma migrate dev --schema prisma/schema/system/system.prisma --name init
#  npx prisma migrate dev --schema prisma/schema/tenant/tenant.prisma --name init
 ```

``` bash
 npm run prisma:generate    # ใช้ Generate script ที่สร้างไว้ใน prisma/schema
 npm run prisma:migrate     # ใช้ Migrate script ที่สร้างไว้ใน prisma/migrations
 npm run prisma:seed        # ใช้ Seed script ที่สร้างไว้ใน prisma/seed
 npm run prisma:deploy      # ใช้ Deploy migrate script ที่สร้างไว้ใน prisma/migrations
 ```

```bash
npx prisma db pull --schema ./prisma/schema/system/system.prisma && npx prisma db pull --schema ./prisma/schema/tenant/tenant.prisma
npx prisma generate --schema prisma/schema/system/system.prisma && npx prisma generate --schema prisma/schema/tenant/tenant.prisma 
npx prisma migrate dev --schema prisma/schema/system/system.prisma && npx prisma migrate dev --schema prisma/schema/tenant/tenant.prisma
```
