import { Role, RoleType } from '../models/role.model';
import { User, UserInput } from '../models/user.model';
import * as bcrypt from 'bcryptjs';

export const seedAdmins = async (): Promise<void> => {
  const role = await Role.findOne({ name: RoleType.SUPER_ADMIN });

  if (!role) {
    console.error('Role not found');

    return;
  }

  const users: UserInput[] = [
    {
      fullName: 'Ned Stark',
      email: 'ned@stark.com',
      password: bcrypt.hashSync('123456', 10),
      role: role._id,
    },
  ];

  for (const user of users) {
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      await User.create(user);
    }
  }
};
