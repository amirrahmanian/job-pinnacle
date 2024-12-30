import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from 'src/db/repository/message.repository';
import { EventService } from 'src/event/event.service';
import { SendMessageDto } from './dto/send-message.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { UserRepository } from 'src/db/repository/user.repository';
import { Message } from 'src/db/schema/message.schema';
import { UserEntity } from 'src/db/entity/user.entity';
import { GetMessagesDto } from './dto/get-messages.dto';
import { FilterQuery } from 'mongoose';
import { ReadMessageDto } from './dto/read-message.dto';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private eventService: EventService,
    private userRepository: UserRepository,
  ) {}

  async getMessages(body: GetMessagesDto, userPayload: UserPayload) {
    const partitionKey = this.generatePartitionKey(
      body.userId,
      userPayload.userId,
    );

    const filter: FilterQuery<Message> = {
      partitionKey,
      deletedAt: null,
    };

    const messagesPromise: Promise<
      (Pick<
        Message,
        '_id' | 'senderId' | 'receiverId' | 'text' | 'readAt' | 'createdAt'
      > & {
        parent?: Pick<Message, '_id' | 'text'>;
      })[]
    > = this.messageRepository.model
      .find(filter, {
        senderId: 1,
        receiverId: 1,
        text: 1,
        readAt: 1,
        createdAt: 1,
      })
      .populate({ path: 'parent', select: { text: 1 } })
      .sort({ _id: -1 })
      .skip(body.skip)
      .limit(body.limit)
      .lean()
      .exec();

    const totalPromise = this.messageRepository.model
      .countDocuments(filter)
      .lean()
      .exec();

    const [messages, total] = await Promise.all([
      messagesPromise,
      totalPromise,
    ]);

    return { total, data: messages };
  }

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

  async readMessage(body: ReadMessageDto, userPayload: UserPayload) {
    const message = await this.messageRepository.model
      .findOne({
        _id: body._id,
        receiverId: userPayload.userId,
        deletedAt: null,
      })
      .select<Pick<Message, '_id' | 'partitionKey' | 'senderId' | 'readAt'>>({
        _id: 1,
        partitionKey: 1,
        senderId: 1,
        readAt: 1,
      })
      .lean()
      .exec();

    if (!message) {
      throw new NotFoundException('not_found.message');
    }

    if (message.readAt) {
      return { _id: message._id.toHexString() };
    }

    const readAt = new Date();

    const updateMessageResult = await this.messageRepository.model.updateMany(
      {
        _id: { $lte: message._id },
        partitionKey: message.partitionKey,
        receiverId: userPayload.userId,
        readAt: null,
      },
      { $set: { readAt } },
    );

    if (updateMessageResult.matchedCount) {
      this.eventService.emitReadMessage({
        _id: message._id,
        senderId: message.senderId,
        receiverId: userPayload.userId,
        readAt,
      });
    }

    return { _id: message._id.toHexString() };
  }

  private generatePartitionKey(senderId: number, receiverId: number) {
    const partitionKey = [senderId, receiverId].sort((a, b) => a - b).join('');

    return partitionKey;
  }
}
