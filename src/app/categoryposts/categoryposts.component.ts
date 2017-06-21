import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';
import { Category } from '../models/category';

@Component({
  selector: 'app-categoryposts',
  templateUrl: './categoryposts.component.html',
  styleUrls: ['./categoryposts.component.css']
})
export class CategorypostsComponent implements OnInit {
  blogs: Blog[];
  currentPage:number;
  totalPages:number;
  isLoading:boolean;
  catId:number;
  catInfo:Category;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;
    this.isLoading = false;

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    }); 

    this.route.params.subscribe(params => {
      this.catId = params['id'] || 1;
    });
  }

  getBlogs(tagId?:any, authorId?:any, catId?:any): void {
  	this.blogService
  		.getBlogs(this.currentPage, tagId, authorId, catId)
  		.then(blogs => {
  			this.blogs = blogs;
  			this.totalPages = this.blogService.totalPages;
        this.isLoading = false;
  		});
  } 

  getNextBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) + 1;
    this.getBlogs(null, null, this.catId);
    this.router.navigateByUrl(`category/${this.catId}?page=${this.currentPage}`);
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) - 1;
    this.getBlogs(null, null, this.catId);
    this.router.navigateByUrl(`category/${this.catId}?page=${this.currentPage}`);
    return false;
  } 

  getCatInfo(): void {
  	this.blogService
  		.getCategoryInfo(this.catId)
  		.then(cat => {
  			this.catInfo = cat;
  		});
  }

  ngOnInit() {
  	this.getBlogs(null, null, this.catId);
  	this.getCatInfo();
  }

}
