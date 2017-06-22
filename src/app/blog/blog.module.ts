import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdButtonModule, MdTabsModule } from '@angular/material';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogService } from './services/blog.service';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ItemComponent } from './components/item/item.component';
import { ItemHeaderComponent } from './components/item-header/item-header.component';
import { ItemSectionComponent } from './components/item-section/item-section.component';
import { ItemFilesComponent } from './components/item-files/item-files.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MdCardModule, MdButtonModule, MdTabsModule,
    SharedModule
  ],
  providers: [BlogService],
  declarations: [ListComponent, ListItemComponent, ItemComponent, ItemHeaderComponent,
    ItemSectionComponent, ItemFilesComponent, PaginationComponent ]
})
export class BlogModule { }
