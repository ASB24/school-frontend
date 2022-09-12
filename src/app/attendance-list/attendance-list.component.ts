import { StickyStyler } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, AttendanceRow, Student } from 'src/interfaces';
import { SchoolService } from '../school.service';

interface studentEntry{
  StudentID: number
  Name: string,
  LastName: string,
  attendanceDate : string,
  isPresent: boolean
}

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.sass']
})
export class AttendanceListComponent implements AfterViewInit {

  dataSource : MatTableDataSource<AttendanceRow> = new MatTableDataSource()
  tableColumns : string[] = ['studentName','studentLastName','isPresent']
  dateSelection = this.formBuilder.group({
    selectedDate : new FormControl(new Date())
  })

  registeredAttendances : AttendanceRow[] = []

  constructor(private _SchoolService : SchoolService, private formBuilder : FormBuilder) {
    
    this._SchoolService.studentListChange.subscribe(list => 
      this.dataSource = new MatTableDataSource(list.map(student => {
        const currDate = new Date(this.dateSelection.controls.selectedDate.value!).toISOString().split('T')[0]
        return {
          studentID: student.id,
          studentName: student.name,
          studentLastName: student.lastName,
          isPresent: false,
          attendanceDate: currDate
        } as AttendanceRow
      }
      ))
      )
    this._SchoolService.attendanceListChange.subscribe(list => {
      this.registeredAttendances = list
    })
    
   }

  ngAfterViewInit(): void {
    
  }

  getPresents(){
    this.dataSource.data.forEach(attendance => attendance.isPresent = false)
    const inputDate = this._SchoolService.formatDate(this.dateSelection.controls.selectedDate.value!.toString())
    this._SchoolService
      .getAttendancesByDate(inputDate)
      .subscribe(attendances => attendances.forEach(attendance => {
        this.dataSource.data.forEach(entry => {
          if(entry.studentID === attendance.studentID){
            entry.isPresent = attendance.isPresent
          }
        })
      }))
  }

  saveAttendances(){
    this.dataSource.data.forEach(attendance => {
      if(attendance.isPresent){
        this._SchoolService.addAttendance(attendance).subscribe()
      }
    })
  }

  ngOnInit(): void {
    
  }

}
