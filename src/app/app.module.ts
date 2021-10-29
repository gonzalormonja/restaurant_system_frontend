import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material-module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoryFormComponent } from './components/category/category-form/categoryForm.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { CharacteristicComponent } from './components/characteristic/characteristic.component';
import { CategoryTableComponent } from './components/category/category-table/category-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuFormComponent } from './components/menu/menu-form/menuForm.component';
import { MenuTableComponent } from './components/menu/menu-table/menu-table.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { Data } from './providers/data';
import { IngredientFormComponent } from './components/ingredient/ingredient-form/ingredient-form.component';
import { IngredientTableComponent } from './components/ingredient/ingredient-table/ingredient-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainNavComponent,
    CategoryFormComponent,
    IngredientComponent,
    CharacteristicComponent,
    CategoryTableComponent,
    CategoryComponent,
    MenuComponent,
    MenuTableComponent,
    MenuFormComponent,
    MenuDetailsComponent,
    IngredientFormComponent,
    IngredientTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    Data,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
