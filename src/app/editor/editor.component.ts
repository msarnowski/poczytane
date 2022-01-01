import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('date') DateField!: ElementRef;
  
  quotes: string[];
  dateAddedString?: string;
  quotesEdited?: string[];
  quotesString?: string;
  
  constructor() {
    this.adding = false;
    this.quotes = [''];
  }

  ngOnInit(): void {
    if (this.adding) {
      this.bookToEdit = undefined;

      const currentDate = new Date();
      const offset = currentDate.getTimezoneOffset();
      const currentMilliseconds = currentDate.getTime();
      const currentDateAdjusted = new Date(currentMilliseconds - (offset * 60000));
      this.dateAddedString = currentDateAdjusted.toISOString().substring(0, 16);
    } else { // editing
      if (this.bookToEdit?.date) {
        const savedDate = new Date(this.bookToEdit.date);
        const offset = savedDate.getTimezoneOffset();
        const savedDateAdjusted = new Date(this.bookToEdit.date - (offset * 60000));

        this.dateAddedString = savedDateAdjusted.toISOString().substring(0, 16);
      }

      if (this.bookToEdit?.quotes) {
        this.quotes = this.bookToEdit.quotes;
      }
    }
    this.quotesString = JSON.stringify(this.quotes);
  }

  handleQuotesUpdate(event: string[]) {
    this.quotesEdited = event;
  }

  handleSubmit(form: any, valid: boolean | null) {
    if (valid) {
      this.quotesEdited = this.quotesEdited?.filter(el => el != '');

      const dateEdited = new Date(form.date);

      if (this.adding && this.nextId) {
        this.bookToEdit = {
          id: this.nextId,
          date: dateEdited.getTime(),
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
        this.bookToEdit!.title = form.title;
        this.bookToEdit!.author.firstName = form.firstName;
        this.bookToEdit!.author.lastName = form.lastName;
        this.bookToEdit!.quotes = this.quotesEdited;
        this.bookToEdit!.note = form.note;
        this.bookToEdit!.date = dateEdited.getTime();
        this.save.emit(this.bookToEdit!);
      }
    }
  }

  handleCancel() {
    this.adding = false;
    this.cancel.emit();
  }

}
