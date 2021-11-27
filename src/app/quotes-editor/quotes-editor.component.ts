import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quotes-editor',
  templateUrl: './quotes-editor.component.html',
  styleUrls: ['./quotes-editor.component.scss']
})
export class QuotesEditorComponent implements OnInit, OnChanges {

  @Input()
  quotesToEdit?: string[];
  
  @Output()
  update: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() {}

  ngOnInit(): void { 
    // console.log(`(quotes editor) quotes: ${this.quotesToEdit}`); 
  }

  ngOnChanges(changes: any): void {
    if (this.quotesToEdit) {
      this.quotesToEdit = Array.from(changes.quotesToEdit.currentValue);
      
      // console.log(Array.from(changes.quotesToEdit.currentValue));
    }
  }

  addQuote() {
    if (this.quotesToEdit) {
      this.quotesToEdit.push('');
    } else {
      this.quotesToEdit = [''];
    }
    // console.log(`quotesToEdit: ${this.quotesToEdit}`);
  }

  updateQuote(event: any, i: number) {
    // console.log(`quote ${i}: ${event.target.value}`);
    // console.log(`index: ${index}`);
    // console.log(`quotesEdited: ${this.quotesEdited}`);
    
    if (this.quotesToEdit) {
      this.quotesToEdit[i] = event.target.value;
      this.update.emit(this.quotesToEdit);
    }

    // console.log(`quotesToEdit: ${this.quotesToEdit}`);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}

// To Do: event emitter