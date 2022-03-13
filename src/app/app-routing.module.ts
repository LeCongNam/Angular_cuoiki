import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AddFormComponent } from './add-form/add-form.component';
import { RegisterComponent } from './content/register/register.component';
import { LoginComponent } from './content/login/login.component';


const routes: Routes = [
  {                                         
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ContentComponent
  },
  {
    path: 'add-project',
    component: AddFormComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
