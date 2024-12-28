import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ReadMessageDto } from './dto/read-message.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async getMessages(
    @Query() getMessagesDto: GetMessagesDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.getMessages(getMessagesDto, userPayload);
  }

  @Post('send')
  sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.sendMessage(sendMessageDto, userPayload);
  }

  @Patch('read')
  async readMessage(
    @Body() readMessageDto: ReadMessageDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.readMessage(readMessageDto, userPayload);
  }
}
