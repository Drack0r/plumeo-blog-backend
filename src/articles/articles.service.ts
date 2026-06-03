import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel.create(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async findOne(id: string): Promise<Article | null> {
    return await this.articleModel.findById(id);
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    return await this.articleModel.findByIdAndUpdate(id, updateArticleDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Article | null> {
    return await this.articleModel.findByIdAndDelete(id);
  }
}
