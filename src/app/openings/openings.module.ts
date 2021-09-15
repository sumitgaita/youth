import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OpeningsRoutingModule } from './Openings-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OpeningsRoutingModule,
    MatTabsModule,
    FormsModule,
    CKEditorModule,
    AgGridModule.withComponents([]),
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class OpeningsModule { }
