import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BulkuploadRoutingModule } from './bulkupload-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BulkuploadRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent
  ]
})
export class BulkuploadModule { }
