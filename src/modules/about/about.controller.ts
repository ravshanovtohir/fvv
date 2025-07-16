import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto, CreateContactDto, UpdateContactDto } from './dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { HeadersValidation, Roles } from '@decorators';
import { DeviceHeadersDto, ParamId, UserRoles } from '@enums';
import { JwtAuthGuard, RolesGuard } from '@guards';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  // --- ABOUT ENDPOINTS ---
  @ApiOperation({
    summary: 'Mobile uchun',
    description: 'Only for mobile.',
  })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async find(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.find(headers.lang);
  }

  @ApiOperation({
    summary: 'Adminka uchun',
    description: 'Only for admin panel.',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  async findAdmin() {
    return this.aboutService.findAdmin();
  }

  @ApiOperation({
    summary: 'Create',
    description: 'Create about',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAboutDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/logo',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@Body() createAboutDto: CreateAboutDto, @UploadedFile() file: Express.Multer.File) {
    return this.aboutService.create(createAboutDto, file.filename);
  }

  @ApiOperation({
    summary: 'Update',
    description: 'Update about',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAboutDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/logo',
        filename: (req, file, cb) => {
          const name = file.originalname.replace(/\s+/g, '');
          const uniqueName = uuidv4() + '-' + name;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(@Body() updateAboutDto: UpdateAboutDto, @UploadedFile() file: Express.Multer.File) {
    return this.aboutService.update(updateAboutDto, file?.filename);
  }

  @ApiOperation({
    summary: 'Delete',
    description: 'Delete about',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async remove() {
    return this.aboutService.remove();
  }

  // --- CONTACT ENDPOINTS ---

  @ApiOperation({
    summary: 'Find one contact',
    description: 'Find one contact',
  })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('contact/:id')
  async findOneContact(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findOneContact(+id, headers.lang);
  }

  @ApiOperation({
    summary: 'Find all contacts',
    description: 'Find all contacts',
  })
  @Roles([UserRoles.USER])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('contact')
  findAllContacts(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findAllContacts(headers.lang);
  }

  @ApiOperation({
    summary: 'Find all contacts admin',
    description: 'Find all contacts admin',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/contacts')
  async findAllContactsAdmin() {
    return this.aboutService.findAllContactsAdmin();
  }

  @ApiOperation({
    summary: 'Find one contact admin',
    description: 'Find one contact admin',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/contacts/:id')
  async findOneContactAdmin(@Param('id') id: string) {
    return this.aboutService.findOneContactAdmin(Number(id));
  }

  @ApiOperation({
    summary: 'Create contact',
    description: 'Create contact',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('contact')
  createContact(@Body() createContactDto: CreateContactDto) {
    return this.aboutService.createContact(createContactDto);
  }

  @ApiOperation({
    summary: 'Update contact',
    description: 'Update contact',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('contact/:id')
  updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.aboutService.updateContact(+id, updateContactDto);
  }

  @ApiOperation({
    summary: 'Delete contact',
    description: 'Delete contact',
  })
  @Roles([UserRoles.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('contact/:id')
  removeContact(@Param('id') id: string) {
    return this.aboutService.removeContact(+id);
  }
}
