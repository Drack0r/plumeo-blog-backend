import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
