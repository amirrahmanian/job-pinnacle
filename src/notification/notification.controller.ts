import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Get user notifications',
    description: 'Retrieve user notifications.',
  })
  @ApiResponse({
    status: 200,
    description: "User's notifications was retrieved",
  })
  async getUserNotification(@User() userPayload: UserPayload) {
    return this.notificationService.getUserNotification(userPayload);
  }
}
