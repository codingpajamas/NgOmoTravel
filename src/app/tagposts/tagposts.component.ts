import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Blog } from '../models/blog';
import { Tag } from '../models/tag';

@Component({
  selector: 'app-tagposts',
  templateUrl: './tagposts.component.html',
  styleUrls: ['./tagposts.component.css']
})
export class TagpostsComponent implements OnInit {
  blogs: Blog[];
  currentPage:number;
  totalPages:number;
  isLoading:boolean;
  tagId:number;
  tagInfo:Tag;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
  	this.totalPages = 1;
    this.isLoading = false;

    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 1;
    }); 

    this.route.params.subscribe(params => {
      this.tagId = params['id'] || 1;
    });
  }

  getBlogs(tagId?:any): void {
  	this.blogService
  		.getBlogs(this.currentPage, tagId)
  		.then(blogs => {
  			this.blogs = blogs;
  			this.totalPages = this.blogService.totalPages;
        this.isLoading = false;
  		});
  } 

  getNextBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) + 1;
    this.getBlogs(this.tagId);
    this.router.navigateByUrl(`tags/${this.tagId}?page=${this.currentPage}`);
    return false;
  } 

  getPreviousBlogs(): boolean {
    this.isLoading = true;
    this.currentPage = Number(this.currentPage) - 1;
    this.getBlogs(this.tagId);
    this.router.navigateByUrl(`tags/${this.tagId}?page=${this.currentPage}`);
    return false;
  } 

  getTagInfo(tagId:number): void {
  	this.blogService
  		.getTagInfo(this.tagId)
  		.then(tag => {
  			this.tagInfo = tag;
  		});
  }

  ngOnInit() {
  	this.getBlogs(this.tagId);
  	this.getTagInfo(this.tagId);
  }

}
