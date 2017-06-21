import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Blog } from '../models/blog';

@Injectable()
export class BlogService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private blogUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/posts';  // URL to web api
  public totalPages;

  constructor(private http: Http) { }


  getBlogs(page:number): Promise<Blog[]> { 
    const params: string = [
      `page=${page}`,
      `_embed`
    ].join('&'); 

    return this.http.get(`${this.blogUrl}?${params}`)
               .toPromise()
               .then((response) => {
                 return response.json().map(post => { 
                   this.totalPages = response.headers['_headers'].get('x-wp-totalpages')[0];
                   
                   return {
                      id: post.id, 
                      title: post.title.rendered,
                      url: post.slug,
                      imageUrl: post._embedded['wp:featuredmedia'].length ? post._embedded['wp:featuredmedia'][0].source_url : '/assets/images/none.jpg',
                      commentCount: post._embedded.replies[0].length,
                      comments: post._embedded.replies[0],
                      date: post.date,
                      author: post._embedded.author[0].name,
                      category: post._embedded['wp:term'][0][0]['name'],
                      content: post.content.rendered,
                      tags: post._embedded['wp:term'][1].map(tag => tag.name)
                   };
                 }) as Blog[];
               })
               .catch(this.handleError);
  }

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
          author: post._embedded.author[0].name,
          category: post._embedded['wp:term'][0][0]['name'],
          content: post.content.rendered,
          tags: post._embedded['wp:term'][1].map(tag => tag.name)
        } as Blog;
      })
      .catch(this.handleError);
  } 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

