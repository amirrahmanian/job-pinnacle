import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
