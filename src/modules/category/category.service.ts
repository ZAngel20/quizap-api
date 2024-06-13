import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../data/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category-create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    return this.repository.find();
  }

  async getACategory(id: number): Promise<CategoryEntity> {
    // GET CATEGORY
    const category = await this.repository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('[category] not found');

    return category;
  }

  async createCategorie(dto: CategoryCreateDto): Promise<void> {
    // CREATE CATEGORY
    const category = this.repository.create();
    category.name = dto.name;

    // SAVE
    await this.repository.save(category);
  }
}
