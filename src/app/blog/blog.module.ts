import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './services/blog.service';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  providers: [BlogService],
  declarations: [ListComponent]
})
export class BlogModule { }
