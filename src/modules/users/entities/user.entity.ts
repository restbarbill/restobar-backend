import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';
import { UserRole } from '../../../common/enums/role.enum';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 120 })
  fullName: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', select: false })
  passwordHash: string;

  @Column({ name: 'pin_code', type: 'varchar', length: 6, nullable: true, unique: true })
  pinCode?: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.WAITER })
  role: UserRole;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl?: string | null;
}
