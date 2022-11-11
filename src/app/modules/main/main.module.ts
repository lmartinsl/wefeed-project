import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { TeamComponent } from './team/team.component';
import { MainRoutingModule } from './main-routing.module';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ProductsListItemComponent } from './products-list/products-list-item/products-list-item.component';

@NgModule({
  declarations: [
    MainComponent,
     TeamComponent,
     StepOneComponent,
     StepTwoComponent,
     StepThreeComponent, 
     CategoriesComponent, 
     ProductsListComponent,
     HeaderComponent,
     ProductsListItemComponent
    ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class MainModule { }
