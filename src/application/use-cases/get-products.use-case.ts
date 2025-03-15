import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ page, limit }: { page?: number; limit?: number }) {
    if (!page || !limit) {
      // Si no hay paginación, devolver todo
      const products = await this.productRepository.findAll();
      return {
        data: products,
        total: products.length,
        page: 1,
        totalPages: 1,
      };
    }

    // Si hay paginación, calcular los valores de paginación
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.productRepository.findPaginated(skip, limit),
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
