import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ page = 1, limit = 10 }) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.productRepository.findAll(skip, limit),
      this.productRepository.count(),
    ]);

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
