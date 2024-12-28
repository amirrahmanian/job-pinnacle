import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from 'src/db/repository/message.repository';
import { EventService } from 'src/event/event.service';
import { SendMessageDto } from './dto/send-message.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { UserRepository } from 'src/db/repository/user.repository';
import { Message } from 'src/db/schema/message.schema';
import { UserEntity } from 'src/db/entity/user.entity';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private eventService: EventService,
    private userRepository: UserRepository,
  ) {}

  async sendMessage(body: SendMessageDto, userPayload: UserPayload) {
    const receiverUser: Pick<UserEntity, 'id'> =
      await this.userRepository.findOne({
        where: { id: body.receiverId },
        select: { id: true },
      });

    if (!receiverUser) throw new NotFoundException('not_found.user');

    const partitionKey = this.generatePartitionKey(
      userPayload.userId,
      receiverUser.id,
    );

    let parent: Pick<Message, '_id' | 'text'>;

    // validate parent
    if (body.parent) {
      parent = await this.messageRepository.model
        .findOne({
          _id: body.parent,
          partitionKey,
          deletedAt: null,
        })
        .select<Pick<Message, '_id' | 'text'>>({ _id: 1, text: 1 })
        .lean()
        .exec();

      if (!parent) {
        throw new NotFoundException('not_found.parent');
      }
    }

    const insertMessageResult = await this.messageRepository.model.create({
      parent: parent?._id,
      senderId: userPayload.userId,
      receiverId: body.receiverId,
      partitionKey,
      text: body.text,
    });

    this.eventService.emitNewMessage({
      _id: insertMessageResult._id,
      senderId: userPayload.userId,
      receiverId: body.receiverId,
      text: body.text,
      createdAt: insertMessageResult.createdAt,
      parent,
    });

    return { _id: insertMessageResult._id.toHexString() };
  }

  private async generatePartitionKey(senderId: number, receiverId: number) {
    const partitionKey = [senderId, receiverId].sort((a, b) => a - b).join('');

    return partitionKey;
  }
}
