import { Role } from '../models/role.model';

export const seedRoles = async (): Promise<void> => {
  const roles = [
    {
      name: 'USER',
      description: 'Authenticated user with read access',
    },
    {
      name: 'ADMIN',
      description: 'Authenticated user with minimal write access',
    },
    {
      name: 'SUPER_ADMIN',
      description: 'Authenticated user with full access',
    },
  ];

  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role.name });

    if (!existingRole) {
      await Role.create(role);
    }
  }
};
