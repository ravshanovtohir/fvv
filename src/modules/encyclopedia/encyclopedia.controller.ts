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
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EncyclopediaService } from './encyclopedia.service';
import { CreateEncyclopediaDto, UpdateEncyclopediaDto, GetEncyclopediaDto } from './dto';
import { HeadersValidation, Roles } from '@decorators';
import { DeviceHeadersDto, UserRoles } from '@enums';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('encyclopedia')
export class EncyclopediaController {
  constructor(private readonly encyclopediaService: EncyclopediaService) {}

  @ApiOperation({ summary: 'Find all encyclopedias mobile', description: 'Find all encyclopedias mobile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.USER])
  @Get()
  async findAll(@Query() query: GetEncyclopediaDto, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.encyclopediaService.findAll(query, headers.lang);
  }

  @ApiOperation({ summary: 'Find one encyclopedia mobile', description: 'Find one encyclopedia mobile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.USER])
  @Get(':id')
  async findOne(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.encyclopediaService.findOne(+id, headers.lang);
  }

  @ApiOperation({ summary: 'Find all encyclopedias admin', description: 'Find all encyclopedias admin' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/encyclopedia')
  async findAllAdmin(@Query() query: GetEncyclopediaDto) {
    return this.encyclopediaService.findAllAdmin(query);
  }

  @ApiOperation({ summary: 'Find one encyclopedia admin', description: 'Find one encyclopedia admin' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/encyclopedia/:id')
  async findOneAdmin(@Param('id') id: string) {
    return this.encyclopediaService.findOneAdmin(+id);
  }

  @ApiOperation({ summary: 'Create encyclopedia', description: 'Create encyclopedia' })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateEncyclopediaDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/encyclopedia_images',
        filename: (req, file, cb) => {
          if (!file) {
            throw new BadRequestException('Требуется изображение!');
          }
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@Body() createEncyclopediaDto: CreateEncyclopediaDto, @UploadedFile() file: Express.Multer.File) {
    return this.encyclopediaService.create(createEncyclopediaDto, file.filename);
  }

  @ApiOperation({ summary: 'Update encyclopedia', description: 'Update encyclopedia' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateEncyclopediaDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/encyclopedia_images',
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
    @Body() updateEncyclopediaDto: UpdateEncyclopediaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.encyclopediaService.update(+id, updateEncyclopediaDto, file.filename);
  }

  @ApiOperation({ summary: 'Delete encyclopedia', description: 'Delete encyclopedia' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.encyclopediaService.remove(+id);
  }
}
