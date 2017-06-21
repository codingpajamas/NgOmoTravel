import { Tag } from './tag';

export class Blog {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  commentCount: number;
  comments: any;
  date: string;
  author: string;
  category: string;
  content: string;
  tags: Tag[];
}
