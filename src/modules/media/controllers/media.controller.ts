import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaService } from '../services/media.service';
import { UploadMediaDto } from '../dtos/upload-media.dto';

@ApiTags('Media (Cloudinary)')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Sube y optimiza una imagen en Cloudinary en formato WebP' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        subfolder: { type: 'string', example: 'products' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadMediaDto,
  ) {
    return this.mediaService.uploadImage(file, dto.subfolder);
  }

  @Delete()
  @ApiOperation({ summary: 'Elimina una imagen de Cloudinary por su publicId' })
  deleteFile(@Query('publicId') publicId: string) {
    return this.mediaService.deleteImage(publicId);
  }
}
