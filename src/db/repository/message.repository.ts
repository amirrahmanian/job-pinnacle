import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';

export class BaseRepository<T> {
  constructor(public model: Model<T>) {}
}

export class MessageRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message.name) model: Model<Message>) {
    super(model);
  }

  async getChatsAndCount(userId: number, skip: number, limit: number) {
    const result = await this.model
      .aggregate()
      .match({
        $or: [{ senderId: userId }, { receiverId: userId }],
        deletedAt: null,
      })
      .group({
        _id: '$partitionKey',
        userId: {
          $last: {
            $switch: {
              branches: [
                { case: { $eq: ['$senderId', userId] }, then: '$receiverId' },
              ],
              default: '$senderId',
            },
          },
        },
        lastMessage: {
          $last: {
            _id: '$_id',
            senderId: '$senderId',
            text: '$text',
            readAt: '$readAt',
            createdAt: '$createdAt',
          },
        },
        unreadsCount: {
          $accumulator: {
            init: function () {
              return 0;
            },
            accumulate: function (state, userId, senderId, readAt) {
              if (senderId === userId) {
                return state;
              }

              if (readAt) {
                return state;
              }

              return state + 1;
            },
            accumulateArgs: [userId, '$senderId', '$readAt'],
            merge: function (state1, state2) {
              return state1 + state2;
            },
            lang: 'js',
          },
        },
      })
      .facet({
        metadata: [{ $count: 'total' }],
        data: [
          { $sort: { 'lastMessage._id': -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
      })
      .exec();

    return [result[0].data, result[0].metadata[0]?.total];
  }
}
