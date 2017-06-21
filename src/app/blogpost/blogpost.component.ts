import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  private postId:number;
  blog:Blog;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
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

  ngOnInit() {
  	this.getBlog();
  }

}
