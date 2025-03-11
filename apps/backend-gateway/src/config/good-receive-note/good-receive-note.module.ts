import { Module } from '@nestjs/common';
import { GoodReceiveNoteService } from './good-receive-note.service';
import { GoodReceiveNoteController } from './good-receive-note.controller';

@Module({
  controllers: [GoodReceiveNoteController],
  providers: [GoodReceiveNoteService],
})
export class GoodReceiveNoteModule {}
