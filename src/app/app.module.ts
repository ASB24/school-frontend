import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { GradeComponentComponent } from './grade-component/grade-component.component';
import { HeaderComponent } from './header/header.component';
import { StudentPackageComponent } from './student-package/student-package.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    StudentsTableComponent,
    AttendanceListComponent,
    GradeComponentComponent,
    HeaderComponent,
    StudentPackageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
