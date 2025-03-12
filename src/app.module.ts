import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ProductModule } from './infrastructure/modules/product.module';

@Module({
  imports: [DatabaseModule, ProductModule], // Importamos los módulos aquí
})
export class AppModule {}
