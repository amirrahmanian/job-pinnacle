import { Controller, Get, Query } from '@nestjs/common';
import { User } from './auth/decorator/user.decorator';
import { UserPayload } from './auth/type/user-payload.type';
import { PaginationDto } from './common/dto/pagination.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getChats(
    @Query() payload: PaginationDto,
    @User() userPayload: UserPayload,
  ) {
    return this.appService.getChats(payload, userPayload);
  }
}
