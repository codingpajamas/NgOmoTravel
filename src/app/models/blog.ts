import { Tag } from './tag';
import { Author } from './author';

export class Blog {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  commentCount: number;
  comments: any;
  date: string;
  author: Author[];
  category: string;
  content: string;
  tags: Tag[];
}
