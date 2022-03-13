import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AddFormComponent } from './add-form/add-form.component';
import { RegisterComponent } from './content/register/register.component';
import { LoginComponent } from './content/login/login.component';
import { ReportComponent } from './content/report/report.component';
import { AuthGuardService } from './content/AuthGuard/auth-guard.service';


const routes: Routes = [
  {                                         
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ContentComponent,
    canActivate:[AuthGuardService] 
  },
  {
    path: 'add-project',
    component: AddFormComponent,
    canActivate:[AuthGuardService] 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate:[AuthGuardService] 
  }
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
