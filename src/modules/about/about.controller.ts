import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto, CreateContactDto, UpdateContactDto } from './dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { HeadersValidation } from '@decorators';
import { DeviceHeadersDto } from '@enums';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  // --- ABOUT ENDPOINTS ---
  @ApiOperation({
    summary: 'Mobile uchun',
    description: 'Only for mobile.',
  })
  @Get()
  async find(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.find(headers.lang);
  }

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
    return this.aboutService.update(updateAboutDto, file.filename);
  }

  @Delete()
  remove() {
    return this.aboutService.remove();
  }

  // --- CONTACT ENDPOINTS ---
  @Post('contact')
  createContact(@Body() createContactDto: CreateContactDto) {
    return this.aboutService.createContact(createContactDto);
  }

  @Get('contact')
  findAllContacts(@HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findAllContacts(headers.lang);
  }

  @Get('contact/:id')
  findOneContact(@Param('id') id: string, @HeadersValidation() headers: DeviceHeadersDto) {
    return this.aboutService.findOneContact(+id, headers.lang);
  }

  @Patch('contact/:id')
  updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.aboutService.updateContact(+id, updateContactDto);
  }

  @Delete('contact/:id')
  removeContact(@Param('id') id: string) {
    return this.aboutService.removeContact(+id);
  }
}
