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
  ],
  exports: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
  ],
})
export class ProductModule {}
