import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { FindAllProductsUseCase } from 'src/application/use-cases/get-products.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/delete-product.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/update-product.use-case';
import { FindProductByIdUseCase } from 'src/application/use-cases/find-product-by-id.use-case';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from 'src/application/services/upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Productos') // Grupo en Swagger
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.getAllProductsUseCase.execute({ page, limit });
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

  @Post('upload')
  @ApiOperation({ summary: 'Subir múltiples imágenes de productos' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 5)) // Máximo 5 imágenes
  async uploadImages(@UploadedFiles() images: Express.Multer.File[]) {
    return this.uploadService.uploadImages(images);
  }
}
