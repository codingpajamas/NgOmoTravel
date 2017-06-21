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
  isLoading:boolean;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;
    this.isLoading = false;

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
        this.isLoading = false;
  		});
  } 

  getNextBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) + 1;
    this.getBlogs();
    this.router.navigateByUrl(`blog?page=${this.currentPage}`);
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) - 1;
    this.getBlogs();
    this.router.navigateByUrl(`blog?page=${this.currentPage}`);
    return false;
  } 

  // todo
  clickBlog(blog:Blog, index:number): boolean{
    // get the next and previous post here using the 'this.blogs[index-1]' and 'this.blogs[index+1]'
    // but what if clicked blog is the last on page
    // or user directly access blog post in the URL

    // redirect to blog post page
    this.router.navigateByUrl(`blog/${blog.id}`);
    return false;
  }

  ngOnInit() {
  	this.getBlogs();
  }

}
