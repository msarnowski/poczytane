import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesEditorComponent } from './quotes-editor.component';

describe('QuotesEditorComponent', () => {
  let component: QuotesEditorComponent;
  let fixture: ComponentFixture<QuotesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
