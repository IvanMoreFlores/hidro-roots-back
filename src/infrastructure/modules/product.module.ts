import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../domain/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository.impl';
import { ProductController } from '../controllers/product.controller';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case';
import { FindProductByIdUseCase } from '../../application/use-cases/find-product-by-id.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { UploadService } from 'src/application/services/upload.service';
import { ConfigService } from '@nestjs/config';
import { DeleteImageProductUseCase } from 'src/application/use-cases/delete-image-product.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductUseCase, // ✅ Agregado
    UpdateProductUseCase, // ✅ Agregado
    DeleteProductUseCase, // ✅ Agregado
    FindAllProductsUseCase, // ✅ Agregado
    FindProductByIdUseCase, // ✅ Agregado
    DeleteImageProductUseCase,
    UploadService,
    ConfigService,
  ],
  exports: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
    DeleteImageProductUseCase,
    UploadService,
    ConfigService,
  ],
})
export class ProductModule {}
