import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
