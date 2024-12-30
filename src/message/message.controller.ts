import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { GetMessagesDto } from './dto/get-messages.dto';
import { ReadMessageDto } from './dto/read-message.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Get messages',
    description: 'Retrieve user messages with pagination.',
  })
  @ApiQuery({
    name: 'userId',
    description: 'The ID of the user whose messages are being retrieved.',
    example: 123,
  })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully.' })
  async getMessages(
    @Query() getMessagesDto: GetMessagesDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.getMessages(getMessagesDto, userPayload);
  }

  @ApiBearerAuth()
  @Post('send')
  @ApiOperation({
    summary: 'Send a message',
    description: 'Send a new message to a user.',
  })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.sendMessage(sendMessageDto, userPayload);
  }

  @ApiBearerAuth()
  @Patch('read')
  @ApiOperation({
    summary: 'Mark a message as read',
    description: 'Mark a specific message as read.',
  })
  @ApiResponse({
    status: 200,
    description: 'Message marked as read successfully.',
  })
  async readMessage(
    @Body() readMessageDto: ReadMessageDto,
    @User() userPayload: UserPayload,
  ) {
    return this.messageService.readMessage(readMessageDto, userPayload);
  }
}
