import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserRepository } from 'src/db/repository/user.repository';

@Injectable()
export class AccountService {
  constructor(private userRepository: UserRepository) {}

  async getUsersGeneralInfo(userIds: number[]) {
    const users = await this.userRepository.find({
      where: [{ id: In(userIds) }],
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return users;
  }
}
