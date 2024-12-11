import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminRepository } from 'src/db/repository/admin.repository';
import { CreateAdminBodyDto } from './dto/create-admin-body.dto';
import { Role } from 'src/common/enum/common.enum';
import { UpdateAdminBodyDto } from './dto/update-admin-body.dto';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async getAdmins() {
    return await this.adminRepository.find();
  }

  async getAdminInfo(adminId: number) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      select: ['id', 'username', 'role', 'permission'],
    });
    if (!admin) throw new NotFoundException('Admin not found');

    return admin;
  }

  async createAdmin(createAdminBodyDto: CreateAdminBodyDto) {
    const admin = await this.adminRepository.findOne({
      where: { username: createAdminBodyDto.username },
      select: { id: true },
    });

    if (admin) throw new BadRequestException('Username is allready exist');

    // // ======================================================================== hash password

    const { identifiers } = await this.adminRepository.insert({
      ...createAdminBodyDto,
      role: Role.Admin,
    });

    return identifiers[0];
  }

  async updateAdmin(adminId: number, updateAdminBodyDto: UpdateAdminBodyDto) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      select: { id: true },
    });

    if (!admin) throw new NotFoundException('Admin not found');

    const { raw } = await this.adminRepository.update(
      { id: adminId },
      updateAdminBodyDto,
    );

    return raw;
  }

  async deleteAdmin(adminId: number) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      select: { id: true },
    });

    if (!admin) throw new NotFoundException('Admin not found');

    const { raw } = await this.adminRepository.delete(adminId);

    return raw;
  }
}
