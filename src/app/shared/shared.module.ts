import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MdToolbarModule } from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { PrettyfilePipe } from './pipes/prettyfile.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdToolbarModule
  ],
  declarations: [HeaderComponent, MarkdownPipe, PrettyfilePipe],
  exports: [HeaderComponent, MarkdownPipe, PrettyfilePipe]
})
export class SharedModule { }
