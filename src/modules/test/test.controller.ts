import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto, UpdateTestDto } from './dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }

  @Post(':id/check')
  async checkAnswer(@Param('id') id: string, @Body() body: { answer: string }) {
    return this.testService.checkAnswer(+id, body.answer);
  }

  @Get('start/:count')
  async startTest(@Param('count') count: string) {
    return this.testService.startTest(+count);
  }
}
