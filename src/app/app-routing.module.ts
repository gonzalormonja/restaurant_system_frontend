import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacteristicComponent } from './components/characteristic/characteristic.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ingredients',
    component: IngredientComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'characteristics',
    component: CharacteristicComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
