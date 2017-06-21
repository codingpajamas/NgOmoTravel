import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Comment } from '../models/comment'

import 'rxjs/add/operator/toPromise'; 

@Injectable()
export class CommentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private commentUrl = 'http://devel2.ordermate.online/wp-json/wp/v2/comments';  // URL to web api 

  constructor(private http: Http) { }


  addComment(email:string, name:string, content:string, postId:number): Promise<Comment> { 
    return this.http.post(
              `${this.commentUrl}`,
              JSON.stringify({author_name:name, author_email:email, content:content, post:postId}),
              {headers: this.headers}
           )
           .toPromise()
           .then((response) => {
             console.log(response);
             return response.json();
           })
           .catch(this.handleError);
  } 

  private handleError(error: any): Promise<any> { 
    let errorBody = JSON.parse(error._body);
    let errorMsg = errorBody ? errorBody.message : 'An error has occurred';
    return Promise.reject(error.message || errorMsg);
  }
}

