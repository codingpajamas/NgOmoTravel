import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-searchposts',
  templateUrl: './searchposts.component.html',
  styleUrls: ['./searchposts.component.css']
})
export class SearchpostsComponent implements OnInit {
  blogs: Blog[];
  currentPage:number;
  totalPages:number;
  isLoading:boolean;
  query:string;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;
    this.isLoading = false;

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
      this.query = params['query'] || '';
    });
  }

  getBlogs(tagId?:any, authorId?:any, catId?:any, query?:string): void {
  	this.blogService
  		.getBlogs(this.currentPage, tagId, authorId, catId, query)
  		.then(blogs => {
  			this.blogs = blogs;
  			this.totalPages = this.blogService.totalPages;
        this.isLoading = false;
  		});
  } 

  getNextBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) + 1;
    this.getBlogs(null, null, null, this.query);
    this.router.navigateByUrl(`search?query=${this.query}&page=${this.currentPage}`);
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) - 1;
    this.getBlogs(null, null, null, this.query);
    this.router.navigateByUrl(`search?query=${this.query}&page=${this.currentPage}`);
    return false;
  }  

  ngOnInit() {
  	this.getBlogs(null, null, null, this.query); 
  }

}
