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

import { BlogService } from './services/blog';

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
    path: 'category/:id',
    component: CategorypostsComponent
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
    CategorypostsComponent
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
