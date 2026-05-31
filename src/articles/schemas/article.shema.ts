import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  authorId!: Types.ObjectId;

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status!: string;

  @Prop({ required: true, unique: true })
  title!: string;

  @Prop({ required: true })
  content!: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
