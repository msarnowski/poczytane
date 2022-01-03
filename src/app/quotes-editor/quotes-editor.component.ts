import { Component, Input, Output, OnInit, OnChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';

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

  constructor(private cDR: ChangeDetectorRef) {}

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.quotesToEdit) {
      this.update.emit(this.quotesToEdit);
    }
  }

  ngOnChanges(changes: any): void {
    if (this.quotesToEdit) {
      this.quotesToEdit = Array.from(changes.quotesToEdit.currentValue);
    }
  }

  addQuote() {
    this.cDR.detach();

    if (this.quotesToEdit) {
      this.quotesToEdit.push('');
    } else {
      this.quotesToEdit = [''];
    }

    this.cDR.detectChanges();

    let inputs = document.getElementsByClassName('quotes-editor__textarea');
    let lastInput = inputs[inputs.length - 1];
    (lastInput as HTMLElement)?.focus();

    this.cDR.reattach();
  }

  updateQuote(event: any, i: number) {
    if (this.quotesToEdit) {
      this.quotesToEdit[i] = event.target.value;
      this.update.emit(this.quotesToEdit);
    }
  }

  removeQuote(index: number) {
    if (this.quotesToEdit) {
      this.quotesToEdit.splice(index, 1);
      this.update.emit(this.quotesToEdit);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}