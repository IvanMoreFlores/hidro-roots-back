import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { FindAllProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/delete-product.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/update-product.use-case';
import { FindProductByIdUseCase } from 'src/application/use-cases/find-product-by-id.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Productos') // Grupo en Swagger
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  async findAll() {
    return this.getAllProductsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findProductByIdUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProductUseCase.execute(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteProductUseCase.execute(id);
  }
}
