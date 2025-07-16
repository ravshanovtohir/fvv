import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginMobileDto, RegisterDto, UpdateFcmTokenDto } from './dto';
import { IRequest } from '@interfaces';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { Roles } from '@decorators';
import { UserRoles } from '@enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login request for admin panel' })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @ApiOperation({ summary: 'register request for mobile' })
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @ApiOperation({ summary: 'login request for mobile' })
  @Post('login-mobile')
  async loginMobile(@Body() data: LoginMobileDto) {
    return await this.authService.loginMobile(data);
  }

  @ApiOperation({ summary: 'get me user mobile', description: 'get me user for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me-user')
  async getMeUser(@Req() request: IRequest) {
    return await this.authService.getMeUser(request.user.id);
  }

  @ApiOperation({ summary: 'get me user admin panel', description: 'get me user for admin panel' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me-admin')
  async getMeAdmin(@Req() request: IRequest) {
    return await this.authService.getMeStaff(request.user.id);
  }

  @ApiOperation({ summary: 'update fcm token', description: 'update fcm token' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateFcmToken(@Req() request: IRequest, @Body() data: UpdateFcmTokenDto) {
    return await this.authService.updateFcmToken(request.user.id, data);
  }

  async refreshToken() {}
}
