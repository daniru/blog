import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MdToolbarModule } from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { PrettyfilePipe } from './pipes/prettyfile.pipe';
import { ClipboardDirective } from './directives/clipboard.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdToolbarModule
  ],
  declarations: [HeaderComponent, MarkdownPipe, PrettyfilePipe, ClipboardDirective],
  exports: [HeaderComponent, MarkdownPipe, PrettyfilePipe, ClipboardDirective]
})
export class SharedModule { }
