import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Book } from '../book-list/book-list.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()
  bookToEdit?: Book;

  @Input()
  adding: Boolean;

  @Input()
  nextId?: number;

  @Output()
  save: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  cancel: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('quotesHiddenField') QuotesHiddenField!: ElementRef;
  
  quotes: string[];
  quotesEdited?: string[];
  quotesString?: string;
  
  constructor() {
    this.adding = false;
    this.quotes = [''];
  }

  ngOnInit(): void {
    if (this.adding) {
      this.bookToEdit = undefined;
    } else { // editing
      if (this.bookToEdit?.quotes) {
        this.quotes = this.bookToEdit.quotes;
      }
    }
    this.quotesString = JSON.stringify(this.quotes);
    // console.log(`(book editor) quotes: ${this.quotes}`);
  }

  handleQuotesUpdate(event: string[]) {
    this.quotesEdited = event;
    console.log(`(book editor) quotesEdited updated: ${this.quotesEdited}`);
    // console.log(`QuotesHiddenField value: ${this.QuotesHiddenField.nativeElement.value}`);
    // console.log(`${event}`);
    // console.log(JSON.stringify(event));
    // this.QuotesHiddenField.nativeElement.value = JSON.stringify(event);
    // this.QuotesHiddenField.nativeElement.dispatchEvent(new Event("input"));
    // console.log(`QuotesHiddenField updated by event: ${event}`);

    // if (this.bookToEdit) {
      // this.bookToEdit.quotes = event;
      // console.log(`bookToEdit.quotes updated by event: ${event}`);
      
      // console.log(this.QuotesHiddenField);
    // } else {
      // console.log('no book to edit');
    // }
  }

  handleSubmit(form: any, valid: boolean | null) {
    if (valid) {
      // console.log(this.quotesEdited);
      this.quotesEdited = this.quotesEdited?.filter(el => el != '');
      // console.log(this.quotesEdited);

      if (this.adding && this.nextId) {
        this.bookToEdit = {
          id: this.nextId,
          date: Date.now(),
          title: form.title,
          author: {
            firstName: form.firstName,
            lastName: form.lastName
          },
          quotes: this.quotesEdited,
          note: form.note
        }
        this.save.emit(this.bookToEdit);
      } else {
        // console.log(form.quoteList);
        this.bookToEdit!.title = form.title;
        this.bookToEdit!.author.firstName = form.firstName;
        this.bookToEdit!.author.lastName = form.lastName;
        // this.bookToEdit!.quotes = JSON.parse(form.quoteList); // null is not an object, usunąć puste cytaty, błąd wyskakuje jeśli nie było edycji (inicjalizacja form?)
        this.bookToEdit!.quotes = this.quotesEdited;
        this.bookToEdit!.note = form.note;
        this.save.emit(this.bookToEdit!);
      }
    }
  }

  handleCancel() {
    this.adding = false;
    this.cancel.emit();
  }

}
