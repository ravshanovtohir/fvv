import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto, UpdateTestDto, StartUserTestDto, AnswerTestDto, GetTestDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { IRequest } from '@interfaces';
import { HeadersValidation, Roles } from '@decorators';
import { DeviceHeadersDto, UserRoles } from '@enums';
import { ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '@guards';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({ summary: 'Get all tests mobile', description: 'Get all tests mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query() query: GetTestDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.testService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Get one test mobile', description: 'Get one test mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.testService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Get all tests admin', description: 'Get all tests admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/tests')
  async findAllAdmin(@Query() query: GetTestDto) {
    return this.testService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Get one test admin', description: 'Get one test admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/tests/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.testService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create test admin', description: 'Create test admin' })
  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @ApiOperation({ summary: 'Update test admin', description: 'Update test admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @ApiOperation({ summary: 'Delete test admin', description: 'Delete test admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
  // --- USER TEST SESSION ENDPOINTS ---

  @ApiOperation({ summary: 'Start user test for mobile', description: 'Start user test for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/user-tests/start')
  async startUserTest(@Body() dto: StartUserTestDto, @Req() request: IRequest) {
    return this.testService.startUserTest(dto.category_id, request.user.id);
  }

  @ApiOperation({ summary: 'Get next test for mobile', description: 'Get next test for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/user-tests/:session_id/next')
  async getNextTest(
    @Param('session_id') session_id: number,
    @Req() request: IRequest,
    @HeadersValidation() headers: DeviceHeadersDto,
  ) {
    return this.testService.getNextTest(+session_id, request.user.id, headers.lang);
  }

  @ApiOperation({ summary: 'Answer test for mobile', description: 'Answer test for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/user-tests/:session_id/answer')
  async answerTest(
    @Param('session_id') session_id: string,
    @Body() dto: AnswerTestDto,
    @Req() request: IRequest,
    @HeadersValidation() headers: DeviceHeadersDto,
  ) {
    return this.testService.answerTest(Number(session_id), dto.test_id, dto.answer, request.user.id, headers.lang);
  }

  @ApiOperation({ summary: 'Finish user test for mobile', description: 'Finish user test for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/user-tests/:session_id/finish')
  async finishUserTest(@Param('session_id') session_id: string, @Req() request: IRequest) {
    return this.testService.finishUserTest(Number(session_id), request.user.id);
  }

  @ApiOperation({ summary: 'Get user test history for mobile', description: 'Get user test history for mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/user-tests/history')
  async getUserTestHistory(@Req() request: IRequest) {
    return this.testService.getUserTestHistory(request.user.id);
  }
}
