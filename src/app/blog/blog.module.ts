import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdButtonModule } from '@angular/material';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogService } from './services/blog.service';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemComponent } from './components/item/item.component';
import { ItemHeaderComponent } from './components/item-header/item-header.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MdCardModule, MdButtonModule
  ],
  providers: [BlogService],
  declarations: [ListComponent, ListItemComponent, ItemComponent, ItemHeaderComponent]
})
export class BlogModule { }
