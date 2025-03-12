import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }
}
