import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@constants';
import { IRequest } from '@interfaces';
import { UserRoles } from '@enums';
import { PrismaService } from '@prisma';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async validateUserByRole(role: UserRoles, id: number) {
    if (role === UserRoles.ADMIN) {
      const staff = await this.prisma.staff.findUnique({ where: { id } });
      if (!staff) {
        throw new UnauthorizedException('Пользователь не найден или не имеет прав администратора!');
      }
    } else if (role === UserRoles.USER) {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new UnauthorizedException('Пользователь не найден или не имеет прав пользователя!');
      }
    } else {
      throw new UnauthorizedException('Недопустимая роль пользователя!');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // First, let Passport set request.user
    const can = (await super.canActivate(context)) as boolean;
    if (!can) return false;

    const request = context.switchToHttp().getRequest<IRequest>();
    const user = request.user;

    if (!user || !user.role || !user.id) {
      throw new UnauthorizedException('Требуется авторизация: отсутствует или некорректный токен!');
    }

    await this.validateUserByRole(user.role, user.id);

    return true;
  }
}
