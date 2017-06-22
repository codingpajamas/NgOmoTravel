import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageNumber:number;
  constructor() {
  	this.imageNumber = Math.floor(Math.random() * 10) + 1;
  }

  ngOnInit() {
  }

}
