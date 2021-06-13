import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccesscontrolRoutingModule } from './accesscontrol-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccesscontrolRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    LayoutComponent,
    ListComponent
  ]
})
export class AccesscontrolModule { }
