import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './../../material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { TeamComponent } from './team/team.component';
import { MainRoutingModule } from './main-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [MainComponent, TeamComponent, AboutComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class MainModule { }
