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
  private APIURL_STUDENTS : string = this.APIURL+"Students/"
  private APIURL_GRADES : string = this.APIURL+"Grades/"
  private APIURL_ATTENDANCES : string = this.APIURL+"Attendances/"
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  selectedStudent : Models.Student = {} as Models.Student
  selectedStudentChange : Subject<Models.Student> = new Subject<Models.Student>()

  constructor(private http : HttpClient, private snackBar : MatSnackBar) { 
    this.selectedStudentChange.subscribe(student => this.selectedStudent = student)
  }

  setSelectedStudent(student : Models.Student) : void {
    this.selectedStudentChange.next(student)
  }

  getClasses() : Observable<string[] | Models.Student[]> {
    return this.http.get<Models.Student[]>(this.APIURL_STUDENTS)
      .pipe(
        tap(_ => console.log('Fetched classes')),
        map((studentList) => studentList.map(student => student.class)),
        catchError(this.handleError<Models.Student[]>('GetStudents', []))
      )
  }

  // GET Students
  getStudents() : Observable<Models.Student[]> {
    return this.http.get<Models.Student[]>(this.APIURL_STUDENTS)
      .pipe(
        tap(res => console.log('Found students')),
        catchError(this.handleError<Models.Student[]>('GetStudents', []))
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
          this.snackBar.open('Student deleted successfully!')
        }),
        catchError(this.handleError<any>('deleteStudent'))
      )
  }



  // GET Grades
  getGrades() : Observable<Models.Grade[]> {
    return this.http.get<Models.Grade[]>(this.APIURL_GRADES)
      .pipe(
        tap(_ => console.log('Found grades')),
        catchError(this.handleError<Models.Grade[]>('GetGrades', []))
      )
  }

  // GET Grade by ID
  getGrade(id: number) : Observable<Models.Grade> {
    const endpoint = this.APIURL_GRADES+"?id="+id
    return this.http.get<Models.Grade>(endpoint)
      .pipe(
        tap(_ => console.log(`Fetched grade with ID: ${id}`)),
        catchError(this.handleError<Models.Grade>(`getGrade ID: ${id}`))
      )
  }

  // POST Grade
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
          this.snackBar.open('Grade updated successfully!', 'Close')
        }),
        catchError(this.handleError<any>('updateGrade'))
      )
  }

  // DELETE Grade
  deleteGrade(id: number) : Observable<any>{
    return this.http.delete<Models.Grade>(this.APIURL_GRADES+"?id="+id)
      .pipe(
        tap(_ => {
          console.log(`Deleted grade with ID: ${id}`)
          this.snackBar.open('Grade deleted successfully!')
        }),
        catchError(this.handleError<any>('deleteGrade'))
      )
  }



  // GET Attendances
  getAttendances() : Observable<Models.Attendance[]> {
    return this.http.get<Models.Attendance[]>(this.APIURL_ATTENDANCES)
      .pipe(
        tap(_ => console.log('Found attendances')),
        catchError(this.handleError<Models.Attendance[]>('GetAttendances', []))
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

  // POST Attendance
  addAttendance(attendance : Models.Attendance) : Observable<Models.Attendance>{
    attendance.createdAt = new Date().toJSON()
    attendance.lastUpdatedAt = attendance.createdAt

    return this.http.post<Models.Attendance>(this.APIURL_ATTENDANCES, attendance, this.httpOptions)
      .pipe(
        tap((attendance: Models.Attendance) => {
          console.log(`Added attendance with ID: ${attendance.id}`)
          this.snackBar.open('Attendance registered successfully!', 'Close')
        }),
        catchError(this.handleError<Models.Attendance>('addAttendance'))
      )
  }

  // PUT Attendance
  updateAttendance(attendance : Models.Attendance) : Observable<any>{
    attendance.lastUpdatedAt = new Date().toJSON()

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
          this.snackBar.open('Attendance deleted successfully!')
        }),
        catchError(this.handleError<any>('deleteAttendance'))
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
