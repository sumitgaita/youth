import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { NotesComponent } from './notes/notes.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    MatTabsModule,
    FormsModule,
    CKEditorModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    NotesComponent
  ]
})
export class ContactsModule { }
