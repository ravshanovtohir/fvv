import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateFcmTokenDto } from './dto';
import { IRequest } from '@interfaces';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'login request for admin panel' })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @ApiOperation({ summary: 'get me user mobile', description: 'get me user for mobile' })
  @Get('me-user')
  async getMeUser(@Req() request: IRequest) {
    return await this.authService.getMeUser(request.user.id);
  }

  @ApiOperation({ summary: 'get me user admin panel', description: 'get me user for admin panel' })
  @Get('me-admin')
  async getMeAdmin(@Req() request: IRequest) {
    return await this.authService.getMeStaff(request.user.id);
  }

  async refreshToken() {}

  @ApiOperation({ summary: 'update fcm token', description: 'update fcm token' })
  async updateFcmToken(@Req() request: IRequest, @Body() data: UpdateFcmTokenDto) {
    return await this.authService.updateFcmToken(request.user.id, data);
  }
}
