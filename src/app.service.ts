import { Injectable } from '@nestjs/common';
import { MessageRepository } from './db/repository/message.repository';
import { PaginationDto } from './common/dto/pagination.dto';
import { UserPayload } from './auth/type/user-payload.type';
import { AccountService } from './account/account.service';

@Injectable()
export class AppService {
  constructor(
    private messageRepository: MessageRepository,
    private accountService: AccountService,
  ) {}

  async getChats(payload: PaginationDto, userPayload: UserPayload) {
    const [chats, total] = await this.messageRepository.getChatsAndCount(
      userPayload.userId,
      payload.skip,
      payload.limit,
    );

    if (chats.length) {
      const userIds = chats.map((chat) => chat.userId);
      const users = await this.accountService.getUsersGeneralInfo(userIds);

      for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];

        chat.user = users.find((user) => user.id === chat.userId);

        delete chat.userId;
      }
    }

    return { total, data: chats };
  }
}
