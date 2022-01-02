import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditorComponent } from './editor/editor.component';

import { FormsModule } from '@angular/forms';
import { QuotesEditorComponent } from './quotes-editor/quotes-editor.component';

import { BookListService } from './book-list.service';
import { ReversePipe } from './reverse.pipe';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    EditorComponent,
    QuotesEditorComponent,
    ReversePipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BookListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
