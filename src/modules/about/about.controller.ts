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
import { DeviceHeadersDto, UserRoles } from '@enums';
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
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles([UserRoles.USER])
  @Get()
  async find(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.find(headers.lang);
  }

  @ApiOperation({
    summary: 'Adminka uchun',
    description: 'Only for admin panel.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin')
  async findAdmin() {
    return this.aboutService.findAdmin();
  }

  @ApiOperation({
    summary: 'Create',
    description: 'Create about',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAboutDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/about',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + '-' + file.originalname;
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Delete()
  async remove() {
    return this.aboutService.remove();
  }

  // --- CONTACT ENDPOINTS ---

  @ApiOperation({
    summary: 'Find one contact',
    description: 'Find one contact',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.USER])
  @Get('contact/:id')
  async findOneContact(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findOneContact(+id, headers.lang);
  }

  @ApiOperation({
    summary: 'Find all contacts mobile',
    description: 'Find all contacts mobile',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles([UserRoles.USER])
  @Get('contact')
  findAllContacts(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findAllContacts(headers.lang);
  }

  @ApiOperation({
    summary: 'Find all contacts admin',
    description: 'Find all contacts admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/contacts')
  async findAllContactsAdmin() {
    return this.aboutService.findAllContactsAdmin();
  }

  @ApiOperation({
    summary: 'Find one contact admin',
    description: 'Find one contact admin',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Get('admin/contacts/:id')
  async findOneContactAdmin(@Param('id') id: string) {
    return this.aboutService.findOneContactAdmin(Number(id));
  }

  @ApiOperation({
    summary: 'Create contact',
    description: 'Create contact',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Post('contact')
  createContact(@Body() createContactDto: CreateContactDto) {
    return this.aboutService.createContact(createContactDto);
  }

  @ApiOperation({
    summary: 'Update contact',
    description: 'Update contact',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Patch('contact/:id')
  updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.aboutService.updateContact(+id, updateContactDto);
  }

  @ApiOperation({
    summary: 'Delete contact',
    description: 'Delete contact',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRoles.ADMIN])
  @Delete('contact/:id')
  removeContact(@Param('id') id: string) {
    return this.aboutService.removeContact(+id);
  }
}
