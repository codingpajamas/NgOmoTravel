import { Tag } from './tag';
import { Author } from './author';
import { Category } from './category';

export class Blog {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  commentCount: number;
  comments: any;
  date: string;
  categories: Category[];
  author: Author[];
  content: string;
  tags: Tag[];
}
