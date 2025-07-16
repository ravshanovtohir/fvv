import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FirstaidService } from './firstaid.service';
import { CreateFirstaidDto, UpdateFirstaidDto, GetFirstaidDto } from './dto';
import { HeadersValidation, Roles } from '@decorators';
import { DeviceHeadersDto, UserRoles } from '@enums';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('firstaid')
export class FirstaidController {
  constructor(private readonly firstaidService: FirstaidService) {}

  @ApiOperation({ summary: 'Find all firstaids mobile', description: 'Find all firstaids mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query() query: GetFirstaidDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.firstaidService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Find one firstaid mobile', description: 'Find one firstaid mobile' })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.firstaidService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all firstaids admin', description: 'Find all firstaids admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/firstaid')
  async findAllAdmin(@Query() query: GetFirstaidDto) {
    return this.firstaidService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Find one firstaid admin', description: 'Find one firstaid admin' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/firstaid/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.firstaidService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create firstaid', description: 'Create firstaid' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFirstaidDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/firstaid_images',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@Body() createFirstaidDto: CreateFirstaidDto, @UploadedFile() file: Express.Multer.File) {
    return this.firstaidService.create(createFirstaidDto, file.filename);
  }

  @ApiOperation({ summary: 'Update firstaid', description: 'Update firstaid' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFirstaidDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/firstaid_images',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateFirstaidDto: UpdateFirstaidDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.firstaidService.update(+id, updateFirstaidDto, file.filename);
  }

  @ApiOperation({ summary: 'Delete firstaid', description: 'Delete firstaid' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.firstaidService.remove(+id);
  }
}
