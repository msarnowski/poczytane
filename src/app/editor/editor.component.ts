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

  @Output()
  save: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  cancel: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('quotesHiddenField') QuotesHiddenField!: ElementRef;
  
  quotes?: string[];
  
  constructor() {
    this.adding = false;
  }

  ngOnInit(): void {
    if (this.adding) {
      this.bookToEdit = undefined;
      this.quotes = [''];
    } else {
      if (this.bookToEdit?.quotes) {
        this.quotes = this.bookToEdit.quotes;
      }
    }
    console.log(`(book editor) quotes: ${this.quotes}`);
  }

  handleQuotesUpdate(event: string[]) {
    // console.log(`(book editor) quotes updated: ${event}`);
    // console.log(`QuotesHiddenField value: ${this.QuotesHiddenField.nativeElement.value}`);
    this.QuotesHiddenField.nativeElement.value = event;
    this.QuotesHiddenField.nativeElement.dispatchEvent(new Event("input"));
  }

  handleSubmit(form: any, valid: boolean | null) {
    if (valid) {
      if (this.adding) {
        this.bookToEdit = {
          id: 999,
          date: 'current date',
          title: form.title,
          author: {
            firstName: form.firstName,
            lastName: form.lastName
          },
          quotes: form.quoteList.split(","),
          note: form.note
        }
        this.save.emit(this.bookToEdit);
      } else {
        this.bookToEdit!.title = form.title;
        this.bookToEdit!.author.firstName = form.firstName;
        this.bookToEdit!.author.lastName = form.lastName;
        this.bookToEdit!.quotes = form.quoteList.split(","); // null is not an object, usunąć puste cytaty, błąd wyskakuje jeśli nie było edycji (inicjalizacja form?) przyszłość JSON encoded string ?
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
