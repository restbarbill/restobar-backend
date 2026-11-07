import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class MediaService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
    subfolder = 'products',
  ): Promise<{ imageUrl: string; publicId: string; format: string }> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No se proporcionó ningún archivo de imagen válido');
    }

    const baseFolder = this.configService.get<string>('CLOUDINARY_FOLDER') || 'restobar-dev';
    const targetFolder = `${baseFolder}/${subfolder}`;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
          format: 'webp',
          transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            return reject(error || new Error('Error al subir imagen a Cloudinary'));
          }
          resolve(uploadResult);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
      format: result.format,
    };
  }

  async deleteImage(publicId: string): Promise<{ deleted: boolean }> {
    if (!publicId) {
      throw new BadRequestException('El publicId de la imagen es obligatorio');
    }
    const result = await cloudinary.uploader.destroy(publicId);
    return { deleted: result.result === 'ok' };
  }
}
