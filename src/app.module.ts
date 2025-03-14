import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ProductModule } from './infrastructure/modules/product.module';
import { CloudinaryConfig } from './infrastructure/config/cloudinary.config';

@Module({
  imports: [DatabaseModule, ProductModule],
  providers: [CloudinaryConfig],
  exports: [CloudinaryConfig],
})
export class AppModule {}
