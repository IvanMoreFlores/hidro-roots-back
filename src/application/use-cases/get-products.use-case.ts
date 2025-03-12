import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
