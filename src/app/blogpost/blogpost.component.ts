import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { CommentService } from '../services/comment';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  private postId:number;
  blog:Blog;
  errorMsg:string;

  constructor(
      private blogService: BlogService, 
      private commentService: CommentService, 
      private router: Router, 
      private route: ActivatedRoute
  ){
    this.errorMsg = '';
  	this.route.params.subscribe(params => {
      this.postId = params['id'] || 1;
    });
  }

  getBlog(): void {
  	this.blogService
  		.getBlog(this.postId)
  		.then(blog => { 
  			this.blog = blog;
  		});
  } 

  submitComment(email: HTMLInputElement, name: HTMLInputElement, content: HTMLInputElement): boolean {
    this.commentService
      .addComment(email.value, name.value, content.value, this.postId)
      .then(comment => { 
          console.log(comment);
        },
        error => {
          this.errorMsg = error;
        }
       );
    return false;
  }

  ngOnInit() {
  	this.getBlog();
  }

}
