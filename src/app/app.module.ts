import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
import { EmployeeServiceService } from './emp-detail/employee-service.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [
    AppComponent,
    EmpDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDatatableModule,
    HttpModule
  ],
  providers: [EmployeeServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
