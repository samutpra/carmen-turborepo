import { Module } from '@nestjs/common';

import { GoodReceiveNoteController } from './good-receive-note.controller';
import { GoodReceiveNoteService } from './good-receive-note.service';

@Module({
  controllers: [GoodReceiveNoteController],
  providers: [GoodReceiveNoteService],
})
export class GoodReceiveNoteModule {}
