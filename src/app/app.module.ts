import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditorComponent } from './editor/editor.component';

import { FormsModule } from '@angular/forms';
import { QuotesEditorComponent } from './quotes-editor/quotes-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    EditorComponent,
    QuotesEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
