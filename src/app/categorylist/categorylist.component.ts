import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog';
import { Category } from '../models/category';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  categories: Category[];
  totalCategories:number;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {

  }

  getCategories(): void {
  	this.blogService
  		.getCategories()
  		.then(categories => {
  			this.categories = categories; 
  			this.totalCategories = this.blogService.totalPages;
  		});
  } 

  ngOnInit() {
  	this.getCategories();
  }

}
