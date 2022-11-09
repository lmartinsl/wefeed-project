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
import { SearchComponent } from '../search/search.module';
import { CategoryItemCardComponent } from './categories/category-item-card/category-item-card.component';

@NgModule({
  declarations: [
    MainComponent,
     TeamComponent,
     StepOneComponent,
     StepTwoComponent,
     StepThreeComponent, 
     CategoriesComponent, 
     SearchComponent,
     CategoryItemCardComponent
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
