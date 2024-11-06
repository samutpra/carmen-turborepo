import { Controller } from '@nestjs/common';
import { CreditNoteService } from './credit-note.service';

@Controller('credit-note')
export class CreditNoteController {
  constructor(private readonly creditNoteService: CreditNoteService) {}
}
