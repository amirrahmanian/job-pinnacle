import { Controller, Get, Query } from '@nestjs/common';
import { User } from './auth/decorator/user.decorator';
import { UserPayload } from './auth/type/user-payload.type';
import { PaginationDto } from './common/dto/pagination.dto';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Get user chats',
    description: 'Retrieve user chats',
  })
  @ApiResponse({
    status: 200,
    description: 'user chats retrieved successfully.',
  })
  async getChats(
    @Query() payload: PaginationDto,
    @User() userPayload: UserPayload,
  ) {
    return this.appService.getChats(payload, userPayload);
  }
}
