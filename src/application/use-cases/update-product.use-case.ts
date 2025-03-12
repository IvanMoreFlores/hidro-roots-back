import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDto) {
    const product = await this.productRepository.update(id, data);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
}
