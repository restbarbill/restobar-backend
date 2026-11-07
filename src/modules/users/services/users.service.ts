import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existingEmail = await this.userRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (existingEmail) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico');
    }

    if (dto.pinCode) {
      const existingPin = await this.userRepository.findOne({
        where: { pinCode: dto.pinCode },
      });
      if (existingPin) {
        throw new ConflictException('Ese PIN numérico ya está asignado a otro empleado');
      }
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = this.userRepository.create({
      fullName: dto.fullName,
      email: dto.email.toLowerCase(),
      passwordHash,
      pinCode: dto.pinCode ?? null,
      role: dto.role,
      isActive: dto.isActive ?? true,
    });

    const saved = await this.userRepository.save(user);
    delete (saved as Partial<User>).passwordHash;
    return saved;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .getOne();
  }

  async findByPinCode(pinCode: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { pinCode, isActive: true },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) {
      user.passwordHash = await argon2.hash(dto.password);
    }
    Object.assign(user, {
      fullName: dto.fullName ?? user.fullName,
      email: dto.email ? dto.email.toLowerCase() : user.email,
      pinCode: dto.pinCode !== undefined ? dto.pinCode : user.pinCode,
      role: dto.role ?? user.role,
      isActive: dto.isActive ?? user.isActive,
    });
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const user = await this.findOne(id);
    await this.userRepository.softRemove(user);
    return { deleted: true };
  }
}
