import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository.impl';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) throw new NotFoundException('Producto no encontrado');
    return { message: 'Producto eliminado correctamente' };
  }
}
