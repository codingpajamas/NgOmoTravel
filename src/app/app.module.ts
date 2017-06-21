import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { TagpostsComponent } from './tagposts/tagposts.component';

import { BlogService } from './services/blog';
import { AuthorpostsComponent } from './authorposts/authorposts.component';

const appRoutes: Routes = [
	{ 
		path: '',
		component: HomepageComponent
	},
	{ 
		path: 'blog',
		component: BloglistComponent
	},
	{ 
		path: 'blog/:id',
		component: BlogpostComponent
	},
  { 
    path: 'tags/:id',
    component: TagpostsComponent
  },
  { 
    path: 'author/:id',
    component: AuthorpostsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BloglistComponent,
    BlogpostComponent,
    TagpostsComponent,
    AuthorpostsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    JsonpModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
