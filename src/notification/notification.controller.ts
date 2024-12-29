import { Controller, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Patch()
  async getUserNotification(@User() userPayload: UserPayload) {
    return this.notificationService.getUserNotification(userPayload);
  }
}
