import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';
import { Author } from '../models/author';

@Component({
  selector: 'app-authorposts',
  templateUrl: './authorposts.component.html',
  styleUrls: ['./authorposts.component.css']
})
export class AuthorpostsComponent implements OnInit {
  blogs: Blog[];
  currentPage:number;
  totalPages:number;
  isLoading:boolean;
  authorId:number;
  authorInfo:Author;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;
    this.isLoading = false;

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    }); 

    this.route.params.subscribe(params => {
      this.authorId = params['id'] || 1;
    });
  }

  getBlogs(tagId?:any, authorId?:any): void {
  	this.blogService
  		.getBlogs(this.currentPage, tagId, authorId)
  		.then(blogs => {
  			this.blogs = blogs;
  			this.totalPages = this.blogService.totalPages;
        this.isLoading = false;
  		});
  } 

  getNextBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) + 1;
    this.getBlogs(null, this.authorId);
    this.router.navigateByUrl(`author/${this.authorId}?page=${this.currentPage}`);
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) - 1;
    this.getBlogs(null, this.authorId);
    this.router.navigateByUrl(`author/${this.authorId}?page=${this.currentPage}`);
    return false;
  } 

  getAuthorInfo(authorId:number): void {
  	this.blogService
  		.getAuthorInfo(this.authorId)
  		.then(author => {
  			this.authorInfo = author;
  		});
  }

  ngOnInit() {
  	this.getBlogs(null, this.authorId);
  	this.getAuthorInfo(this.authorId);
  }

}
