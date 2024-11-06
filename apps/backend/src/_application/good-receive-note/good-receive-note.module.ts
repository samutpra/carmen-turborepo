import { GoodReceiveNoteController } from './good-receive-note.controller';
import { GoodReceiveNoteService } from './good-receive-note.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [GoodReceiveNoteController],
  providers: [GoodReceiveNoteService],
})
export class GoodReceiveNoteModule {}
