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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BloglistComponent,
    BlogpostComponent,
    TagpostsComponent
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
