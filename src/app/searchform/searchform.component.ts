import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  query:string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { 
      this.query = params['query'] || '';
    });
  }

  submitSearch(search: HTMLInputElement): boolean {
  	this.router.navigateByUrl(`search?query=${search.value}`);
  	return false;
  }

  ngOnInit() {
  }

}
