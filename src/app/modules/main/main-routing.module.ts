import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from 'src/app/services/auth-guard/auth-guard.service';
import { CategoriesComponent } from './categories/categories.component';
import { MainComponent } from './main.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'step-one', component: StepOneComponent },
  { path: 'step-two', component: StepTwoComponent },
  { path: 'step-three', component: StepThreeComponent },
  { path: '', component: MainComponent },
  { path: 'categories', component: CategoriesComponent,
  canActivate: [AuthorizeGuard] },
  { path: 'products', component: ProductsListComponent,
  canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
