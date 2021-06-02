import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent
  ]
})
export class CompanyModule { }
