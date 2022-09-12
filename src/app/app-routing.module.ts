import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AttendanceListComponent } from './attendance-list/attendance-list.component'
import { GradeComponentComponent } from './grade-component/grade-component.component'
import { StudentPackageComponent } from './student-package/student-package.component'

const routes: Routes = [
  {path: 'students', component: StudentPackageComponent},
  {path: 'grades', component: GradeComponentComponent},
  {path: 'attendances', component: AttendanceListComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
