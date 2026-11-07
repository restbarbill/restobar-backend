import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from '../../config/cloudinary.config';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';

@Module({
  imports: [ConfigModule],
  controllers: [MediaController],
  providers: [CloudinaryProvider, MediaService],
  exports: [MediaService],
})
export class MediaModule {}
