import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdvancedsearchComponent } from './advancedsearch/advancedsearch.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CandidatesRoutingModule,
    MatTabsModule,
    MatSlideToggleModule,
    FormsModule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    AdvancedsearchComponent
  ]
})
export class CandidatesModule { }
