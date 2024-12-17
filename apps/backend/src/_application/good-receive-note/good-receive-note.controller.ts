import { Controller } from '@nestjs/common';

import { GoodReceiveNoteService } from './good-receive-note.service';

@Controller("good-receive-note")
export class GoodReceiveNoteController {
  constructor(
    private readonly goodReceiveNoteService: GoodReceiveNoteService,
  ) {}
}
