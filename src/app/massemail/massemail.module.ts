import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MassemailRoutingModule } from './massemail-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { ComposemailComponent } from './composemail/composemail.component';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MassemailRoutingModule,
    CKEditorModule,    
    AgGridModule.withComponents([])
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    ComposemailComponent
  ]
})
export class MassemailModule { }
