import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { TagpostsComponent } from './tagposts/tagposts.component';
import { AuthorpostsComponent } from './authorposts/authorposts.component';
import { CategorypostsComponent } from './categoryposts/categoryposts.component';
import { SearchformComponent } from './searchform/searchform.component';
import { SearchpostsComponent } from './searchposts/searchposts.component';
import { CategorylistComponent } from './categorylist/categorylist.component';

import { BlogService } from './services/blog';
import { CommentService } from './services/comment';

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
    path: 'tag/:id',
    component: TagpostsComponent
  },
  { 
    path: 'author/:id',
    component: AuthorpostsComponent
  },
  { 
    path: 'categories',
    component: CategorylistComponent
  },
  { 
    path: 'category/:id',
    component: CategorypostsComponent
  },
  { 
    path: 'search',
    component: SearchpostsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BloglistComponent,
    BlogpostComponent,
    TagpostsComponent,
    AuthorpostsComponent,
    CategorypostsComponent,
    SearchformComponent,
    SearchpostsComponent,
    CategorylistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    JsonpModule
  ],
  providers: [BlogService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
