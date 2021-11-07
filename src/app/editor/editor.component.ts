import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() {
    this.adding = false;
  }

  ngOnInit(): void {
  }

  handleSubmit(form: any, valid: boolean | null) {
    if (valid) {
      this.bookToEdit!.title = form.title;
      this.bookToEdit!.author.firstName = form.firstName;
      this.bookToEdit!.author.lastName = form.lastName;
      this.save.emit(this.bookToEdit!);
    }
  }

  handleCancel() {
    this.adding = false;
    this.cancel.emit();
  }

}
