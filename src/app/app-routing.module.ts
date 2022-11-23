import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './services/auth-guard/auth-guard.service';
import { CategoriesComponent } from './modules/main/categories/categories.component';
import { ProductsListComponent } from './modules/main/products-list/products-list.component';
import { ProductRegisterComponent } from './modules/main/product-register/product-register.component';
import { UserInfoComponent } from './modules/main/user-info/user-info.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthorizeGuard]
  },
  { path: 'cat', component: CategoriesComponent  },
  { path: 'pro', component: ProductsListComponent  },
  { path: 'reg', component: ProductRegisterComponent  },
  { path: 'us', component: UserInfoComponent  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
