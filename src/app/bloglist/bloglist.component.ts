import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {
  blogs: Blog[];
  currentPage:number;
  totalPages:number;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    }); 
  }

  getBlogs(): void {
  	this.blogService
  		.getBlogs(this.currentPage)
  		.then(blogs => {
  			this.blogs = blogs;
  			this.totalPages = this.blogService.totalPages;
  		});
  } 

  getNextBlogs(): boolean {
    this.currentPage +=this.currentPage;
    this.getBlogs();
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.currentPage = this.currentPage - 1;
    this.getBlogs();

    return false;
  } 

  selectBlog(blog:Blog, index:number): boolean{
    console.log(index, blog);
    this.router.navigateByUrl(`blog/${blog.id}`);
    return false;
  }

  ngOnInit() {
  	this.getBlogs();
  }

}
