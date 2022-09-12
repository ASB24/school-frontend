import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as Models from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private APIURL : string = "https://localhost:7296/api/" //default EF Core Web API url
  private APIURL_STUDENTS : string = this.APIURL+"Students"
  private APIURL_GRADES : string = this.APIURL+"Grades"
  private APIURL_ATTENDANCES : string = this.APIURL+"Attendances"
  private APIURL_ATTENDANCES_VIEW : string = this.APIURL+"Views/attendances"
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  studentList : Models.Student[] = []
  studentListChange : Subject<Models.Student[]> = new Subject<Models.Student[]>()

  attendanceList : Models.AttendanceRow[] = []
  attendanceListChange : Subject<Models.AttendanceRow[]> = new Subject<Models.AttendanceRow[]>()

  gradeList : Models.Grade[] = []
  gradeListChange : Subject<Models.Grade[]> = new Subject<Models.Grade[]>()
  //Poner el subject pal componente de grade


  selectedStudent : Models.Student = {} as Models.Student
  selectedStudentChange : Subject<Models.Student> = new Subject<Models.Student>()

  formatDate(dateString : string) : string {
    return new Date(dateString).toISOString().split('T')[0]
  }  

  constructor(private http : HttpClient, private snackBar : MatSnackBar) { 
    this.selectedStudentChange.subscribe(student => this.selectedStudent = student)
    this.studentListChange.subscribe(list => this.studentList = list)
    this.attendanceListChange.subscribe(list => this.attendanceList = list)
    this.gradeListChange.subscribe(list => this.gradeList = list)

    this.getStudents().subscribe(list => this.studentListChange.next(list))
    this.getAttendances().subscribe(list => {
      this.attendanceListChange.next(list)
    })
  }

  setSelectedStudent(student : Models.Student) : void {
    this.selectedStudentChange.next(student)
  }

  getStudents() : Observable<Models.Student[]> {
    return this.http.get<Models.Student[]>(this.APIURL_STUDENTS)
      .pipe(
        tap(res => console.log('Found students')),
        catchError(this.handleError<Models.Student[]>('GetStudents', []))
      )
  }

  getGrades(studentID : number) : Observable<Models.Grade[]> {
    return this.http.get<Models.Grade[]>(this.APIURL_GRADES+"/"+studentID)
      .pipe(
        tap(res => console.log(`Found grades for ${studentID}`,res)),
        catchError(this.handleError<Models.Grade[]>('GetGrades', []))
      )
  }

  getAttendances() : Observable<Models.AttendanceRow[]> {
    return this.http.get<Models.AttendanceRow[]>(this.APIURL_ATTENDANCES_VIEW)
      .pipe(
        tap(_ => console.log('Found attendances')),
        tap(attendanceList => attendanceList.map(attendance => attendance.attendanceDate = attendance.attendanceDate.split('T')[0])),
        catchError(this.handleError<Models.AttendanceRow[]>('GetAttendancesRow', []))
      )
  }


  // GET Student by ID
  getStudent(id: number) : Observable<Models.Student> {
    const endpoint = this.APIURL_STUDENTS+"?id="+id
    return this.http.get<Models.Student>(endpoint)
      .pipe(
        tap(_ => console.log(`Fetched student with ID: ${id}`)),
        catchError(this.handleError<Models.Student>(`getStudent ID: ${id}`))
      )
  }

  // POST Student
  addStudent(student : Models.Student) : Observable<Models.Student>{
    student.createdAt = new Date().toJSON()
    student.lastUpdatedAt = student.createdAt

    return this.http.post<Models.Student>(this.APIURL_STUDENTS, student, this.httpOptions)
      .pipe(
        tap((student: Models.Student) => {
          console.log(`Added student with ID: ${student.id}`)
          this.snackBar.open('Student registered successfully!', 'Close')
          this.studentList.push(student)
          this.studentListChange.next(this.studentList)
        }),
        catchError(this.handleError<Models.Student>('addStudent'))
      )
  }

  // PUT Student
  updateStudent(student : Models.Student) : Observable<any>{
    student.lastUpdatedAt = new Date().toJSON()

    return this.http.put(this.APIURL_STUDENTS, student, this.httpOptions)
      .pipe(
        tap(_ => {
          console.log(`Updated student with ID: ${student.id}`)
          this.snackBar.open('Student updated successfully!', 'Close')
          this.studentListChange.next(this.studentList)
        }),
        catchError(this.handleError<any>('updateStudent'))
      )
  }

  // DELETE Student
  deleteStudent(id: number) : Observable<any>{
    return this.http.delete<Models.Student>(this.APIURL_STUDENTS+"?id="+id)
      .pipe(
        tap(_ => {
          console.log(`Deleted student with ID: ${id}`)
          this.snackBar.open('Student deleted successfully!', 'Close')
        }),
        catchError(this.handleError<any>('deleteStudent'))
      )
  }

  // GET Attendance by ID
  getAttendance(id: number) : Observable<Models.Attendance> {
    const endpoint = this.APIURL_ATTENDANCES+"?id="+id
    return this.http.get<Models.Attendance>(endpoint)
      .pipe(
        tap(_ => console.log(`Fetched attendance with ID: ${id}`)),
        catchError(this.handleError<Models.Attendance>(`getAttendance ID: ${id}`))
      )
  }

  getAttendancesByDate(date: string) : Observable<Models.Attendance[]>{
    const endpoint = this.APIURL_ATTENDANCES+"/byDate"
    return this.http.get<Models.Attendance[]>(endpoint+`?date='${date}'`)
      .pipe(
        catchError(this.handleError<Models.Attendance[]>('getAttendancesByDate'))
      )
  }

  // POST Attendance
  addAttendance(attendance : Models.Attendance) : Observable<Models.Attendance>{
    return this.http.post<Models.Attendance>(this.APIURL_ATTENDANCES, attendance, this.httpOptions)
      .pipe(
        tap((attendance: Models.Attendance) => {
          console.log(`Added attendance with ID: ${attendance.id}`)
        }),
        catchError(this.handleError<Models.Attendance>('addAttendance'))
      )
  }

  // PUT Attendance
  updateAttendance(attendance : Models.Attendance) : Observable<any>{
    return this.http.put(this.APIURL_ATTENDANCES, attendance, this.httpOptions)
      .pipe(
        tap(_ => {
          console.log(`Updated attendance with ID: ${attendance.id}`)
          this.snackBar.open('Attendance updated successfully!', 'Close')
        }),
        catchError(this.handleError<any>('updateAttendance'))
      )
  }

  // DELETE Attendance
  deleteAttendance(id: number) : Observable<any>{
    return this.http.delete<Models.Attendance>(this.APIURL_ATTENDANCES+"?id="+id)
      .pipe(
        tap(_ => {
          console.log(`Deleted attendance with ID: ${id}`)
          this.snackBar.open('Attendance deleted successfully!', 'Close')
        }),
        catchError(this.handleError<any>('deleteAttendance'))
      )
  }


  addGrade(grade : Models.Grade) : Observable<Models.Grade>{
    grade.createdAt = new Date().toJSON()
    grade.lastUpdatedAt = grade.createdAt

    return this.http.post<Models.Grade>(this.APIURL_GRADES, grade, this.httpOptions)
      .pipe(
        tap((grade: Models.Grade) => {
          console.log(`Added grade with ID: ${grade.id}`)
          this.snackBar.open('Grade registered successfully!', 'Close')
        }),
        catchError(this.handleError<Models.Grade>('addGrade'))
      )
  }

  // PUT Grade
  updateGrade(grade : Models.Grade) : Observable<any>{
    grade.lastUpdatedAt = new Date().toJSON()

    return this.http.put(this.APIURL_GRADES, grade, this.httpOptions)
      .pipe(
        tap(_ => {
          console.log(`Updated grade with ID: ${grade.id}`)
        }),
        catchError(this.handleError<any>('updateGrade'))
      )
  }

  // Error Handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
