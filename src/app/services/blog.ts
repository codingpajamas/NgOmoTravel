import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Blog } from '../models/blog';
import { Tag } from '../models/tag';
import { Author } from '../models/author';
import { Category } from '../models/category';

@Injectable()
export class BlogService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private blogUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/posts';  // URL to web api
  private tagUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/tags';
  private authorUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/users';
  private categoryUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/categories';
  public totalPages;
  public totalBlogs;

  constructor(private http: Http) { }


  getBlogs(page:number, tagid?:any, authorid?:any, catid?:any, query?:any): Promise<Blog[]> { 

    // reset 
    this.totalBlogs = 0;
    this.totalPages = 0;

    const params: string = [
      `page=${page}`,
      `_embed`
    ].join('&');


    const tagParam:string = tagid ? `&tags=${tagid}` : '';
    const authorParam:string = authorid ? `&author=${authorid}` : '';
    const categoryParam:string = catid ? `&categories=${catid}` : '';
    const searchParam:string = query ? `&search=${query}` : ''; 

    return this.http.get(`${this.blogUrl}?${params}${tagParam}${authorParam}${categoryParam}${searchParam}`)
               .toPromise()
               .then((response) => {
                 return response.json().map(post => {
                   this.totalPages = response.headers['_headers'].get('x-wp-totalpages')[0];
                   this.totalBlogs = response.headers['_headers'].get('x-wp-total')[0];
                   
                   return {
                      id: post.id, 
                      title: post.title.rendered,
                      url: post.slug,
                      imageUrl: post._embedded['wp:featuredmedia'].length ? post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : '/assets/images/none.jpg',
                      commentCount: post._embedded.replies[0].length,
                      comments: post._embedded.replies[0],
                      date: post.date,
                      author: post._embedded.author.map(function(author){
                        return {id:author.id, name:author.name, avatar:author.avatar_urls[48]} as Author
                      }),
                      categories: post._embedded['wp:term'][0].map(function(category){
                        return {id:category.id, name:category.name} as Category
                      }),
                      content: post.content.rendered,
                      tags: post._embedded['wp:term'][1].map(function(tag){
                        return {id:tag.id, name:tag.name} as Tag
                      })
                   };
                 }) as Blog[];
               })
               .catch(this.handleError);
  }

  // author: {id:post._embedded.author[0].id, name:post._embedded.author[0].name} as Author,

  getBlog(id: number): Promise<Blog> { 
    return this.http.get(`${this.blogUrl}/${id}?_embed`)
      .toPromise()
      .then((response) => {
        let post = response.json();
        
        return {
          id: post.id, 
          title: post.title.rendered,
          url: post.slug,
          imageUrl: post._embedded['wp:featuredmedia'].length ? post._embedded['wp:featuredmedia'][0].source_url : '/assets/images/none.jpg',
          commentCount: post._embedded.replies[0].length,
          comments: post._embedded.replies[0],
          date: post.date,
          author: post._embedded.author.map(function(author){
            return {id:author.id, name:author.name, avatar:author.avatar_urls[48]} as Author
          }),
          categories: post._embedded['wp:term'][0].map(function(category){
            return {id:category.id, name:category.name} as Category
          }),
          content: post.content.rendered,
          tags: post._embedded['wp:term'][1].map(function(tag){
            return {id:tag.id, name:tag.name} as Tag
          })
        } as Blog;
      })
      .catch(this.handleError);
  } 
 
 
  getTagInfo(id: number): Promise<Tag> { 
    return this.http.get(`${this.tagUrl}/${id}`)
      .toPromise()
      .then((response) => {
        let tag = response.json();

        return {
          id: tag.id,
          name: tag.name,
          count: tag.count
        } as Tag;
      })
      .catch(this.handleError);
  } 

  getAuthorInfo(id: number): Promise<Author> { 
    return this.http.get(`${this.authorUrl}/${id}`)
      .toPromise()
      .then((response) => {
        let author = response.json();

        return {
          id: author.id,
          name: author.name,
          avatar:author.avatar_urls[48]
        } as Author;
      })
      .catch(this.handleError);
  } 

  getCategories(): Promise<Category[]> { 
    return this.http.get(`${this.categoryUrl}`)
      .toPromise()
      .then((response) => {
        return response.json().map(category => {

         // i could create a new variable for categories count but i'm using totalBlogs instead of totalCats
         this.totalBlogs = response.headers['_headers'].get('x-wp-total')[0];

         return {
            id: category.id, 
            name: category.name,
            count: category.count
         };
       }) as Category[];
      })
      .catch(this.handleError);
  }

  getCategoryInfo(id: number): Promise<Category> { 
    return this.http.get(`${this.categoryUrl}/${id}`)
      .toPromise()
      .then((response) => {
        let category = response.json();

        return {
          id: category.id,
          name: category.name,
          count: category.count
        } as Category;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

