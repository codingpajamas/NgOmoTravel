import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {

  constructor(private router: Router) { }

  submitSearch(search: HTMLInputElement): boolean {
  	console.log(`you are searching: ${search.value}`);
  	this.router.navigateByUrl(`search?query=${search.value}`);

  	return false;
  }

  ngOnInit() {
  }

}
