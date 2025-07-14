import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto, CreateContactDto, UpdateContactDto } from './dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from '../category/dto';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  // --- ABOUT ENDPOINTS ---
  @Get()
  async find() {
    return this.aboutService.find();
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
    return this.aboutService.create(createAboutDto, file);
  }

  @Patch(':id')
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
    return this.aboutService.update(updateAboutDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(+id);
  }

  // --- CONTACT ENDPOINTS ---
  @Post('contact')
  createContact(@Body() createContactDto: CreateContactDto) {
    return this.aboutService.createContact(createContactDto);
  }

  @Get('contact')
  findAllContacts() {
    return this.aboutService.findAllContacts();
  }

  @Get('contact/:id')
  findOneContact(@Param('id') id: string) {
    return this.aboutService.findOneContact(+id);
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
