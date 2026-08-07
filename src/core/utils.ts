import 'dotenv/config';
import { AppDataSource } from '@/data-source';
import { User } from '@/features/authentification/user.entity';
import { Role } from '@/core/enum/enum';
import argon2 from 'argon2';

export async function createSuperAdmin() {
  const adminFullName = process.env.ADMIN_FULLNAME;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !adminUsername || !adminFullName) {
    throw new Error('Admin username and password not found in environment variables');
  }

  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository<User>(User);

  const alreadyExists = await userRepo.existsBy({ userName: adminUsername });
  if (!alreadyExists) {
    const newSuperAdmin = userRepo.create({
      role: Role.SUPER_ADMIN,
      userName: adminUsername,
      fullName: adminFullName,
      isActive: true,
      isVerified: true,
      password: '',
    } as User);
    newSuperAdmin.password = await argon2.hash(adminPassword);
    await User.save(newSuperAdmin);
  }
}
