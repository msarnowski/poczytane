import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
