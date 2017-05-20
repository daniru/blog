import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdButtonModule, MdTabsModule, MdMenuModule, MdIconModule, MdInputModule, MdToolbarModule } from '@angular/material';
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
import { BlogFirebaseService } from './services//blog-firebase.service';
import { ItemCommentsComponent } from './components/item-comments/item-comments.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { EditItemSectionComponent } from './components/edit-item-section/edit-item-section.component';
import { EditItemFileComponent } from './components/edit-item-file/edit-item-file.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule, ReactiveFormsModule,
    MdCardModule, MdButtonModule, MdTabsModule, MdMenuModule, MdIconModule, MdInputModule, MdToolbarModule,
    SharedModule
  ],
  providers: [{ provide: BlogService, useClass: BlogFirebaseService }],
  declarations: [ListComponent, ListItemComponent, ItemComponent, ItemHeaderComponent, ItemSectionComponent,
    ItemFilesComponent, PaginationComponent, ItemCommentsComponent, EditItemComponent, EditItemSectionComponent, EditItemFileComponent]
})
export class BlogModule { }
