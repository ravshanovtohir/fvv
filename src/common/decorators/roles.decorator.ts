import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, IS_PUBLIC_KEY } from '@constants';

export const Roles = (roles: any[]) => SetMetadata(ROLES_KEY, roles);
export const IsPublic = (...args: string[]) => SetMetadata(IS_PUBLIC_KEY, args);
