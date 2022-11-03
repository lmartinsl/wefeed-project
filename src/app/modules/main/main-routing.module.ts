import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from 'src/app/services/auth-guard/auth-guard.service';
import { SearchComponent } from '../search/search.module';
import { CategoriesComponent } from './categories/categories.module';
import { MainComponent } from './main.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'step-one', component: StepOneComponent },
  { path: 'step-two', component: StepTwoComponent },
  { path: 'step-three', component: StepThreeComponent },
  { path: 'categories', component: CategoriesComponent,
  canActivate: [AuthorizeGuard] },
  { path: 'search', component: SearchComponent,
  canActivate: [AuthorizeGuard] },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
