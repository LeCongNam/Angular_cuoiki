import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { LoggerService } from './services/logger.service';
import { FooterComponent } from './footer/footer.component';
import { DatePipe } from './pipe/date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddFormComponent } from './add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaddingComponent } from './content/loadding/loadding.component';
import { UpdateItemComponent } from './content/update-item/update-item.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RegisterComponent } from './content/register/register.component';
import { ReportComponent } from './content/report/report.component';
import { LoginComponent } from './content/login/login.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartComponent } from './content/report/google-chart/google-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    DatePipe,
    LoginComponent,
    AddFormComponent,
    LoaddingComponent,
    UpdateItemComponent,
    RegisterComponent,
    ReportComponent,
    GoogleChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    Ng2GoogleChartsModule
  ],
  providers: [
    LoggerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
