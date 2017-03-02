import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './services/blog.service';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  providers: [BlogService],
  declarations: [ListComponent, ListItemComponent, ItemComponent]
})
export class BlogModule { }
