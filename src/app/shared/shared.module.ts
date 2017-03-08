import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MdToolbarModule, MdSnackBarModule, MdDialogModule, MdTooltipModule, MdButtonModule } from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { PrettyfilePipe } from './pipes/prettyfile.pipe';
import { ClipboardDirective } from './directives/clipboard.directive';
import { AuthComponent } from './components/auth/auth.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdToolbarModule, MdSnackBarModule, MdDialogModule, MdTooltipModule, MdButtonModule
  ],
  declarations: [HeaderComponent, MarkdownPipe, PrettyfilePipe, ClipboardDirective, AuthComponent, AuthDialogComponent],
  exports: [HeaderComponent, MarkdownPipe, PrettyfilePipe, ClipboardDirective],
  entryComponents: [ AuthDialogComponent ]
})
export class SharedModule { }
