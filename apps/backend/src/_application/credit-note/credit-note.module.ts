import { CreditNoteController } from './credit-note.controller';
import { CreditNoteService } from './credit-note.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CreditNoteController],
  providers: [CreditNoteService],
})
export class CreditNoteModule {}
