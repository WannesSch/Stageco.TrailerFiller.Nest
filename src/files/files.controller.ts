import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
  uploadSingle(@UploadedFile() file) {
  console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10, { dest: './uploads' }))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
  }
