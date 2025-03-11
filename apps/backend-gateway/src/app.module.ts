import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VendorProductModule } from './vendor-product/vendor-product.module';
import { LocationsUserModule } from './locations-user/locations-user.module';
import { UnitCommentModule } from './unit-comment/unit-comment.module';
import { DepartmentUserModule } from './department-user/department-user.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { CreditNoteModule } from './config/credit-note/credit-note.module';

@Module({
  imports: [
    AuthModule,
    DepartmentUserModule,
    UnitCommentModule,
    LocationsUserModule,
    VendorProductModule,
    CreditNoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
