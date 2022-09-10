import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/interfaces';
import { SchoolService } from '../school.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.sass']
})
export class StudentsTableComponent implements AfterViewInit {

  dataSource : MatTableDataSource<Student> = new MatTableDataSource()
  tableColumns : string[] = ['id','name','lastName','class', 'action']
  
  constructor(private SchoolService: SchoolService, private changeDetector : ChangeDetectorRef) { 
    this.SchoolService.getStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  ngOnInit(): void {
    
  }

  sendStudent(student : Student) : void {
    this.SchoolService.setSelectedStudent(student)
  }

  deleteStudent(student : Student, index : number) : void {
    this.SchoolService.deleteStudent(student.id as number).subscribe(_ => {
      this.dataSource.data.splice(index, 1)
      this.dataSource._updateChangeSubscription()
    })
  }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    setTimeout(()=>{
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event : Event){
    const textFilter = (event.target as HTMLInputElement).value
    this.dataSource.filter = textFilter.trim().toLowerCase()
  }

}
